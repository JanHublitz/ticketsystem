import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
    TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, Box,
    makeStyles, LinearProgress, Button, Dialog, MenuItem, Select, InputLabel, FormControl
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import AddIcon from '@material-ui/icons/Add';
import SyncIcon from '@material-ui/icons/Sync';
import SettingsIcon from "@material-ui/icons/Settings"

import "../../css/Ticketsystem/Ticketsystem.scss"
import ViewTicketAlert from './ViewTicketAlert';
import NewTicketAlert from './NewTicketAlert';


const headCells = [
    { id: 'id', numeric: false, disablePadding: true, label: '#' },
    { id: 'prioritaet', numeric: true, disablePadding: true, label: 'Priorität' },
    { id: 'thema', numeric: false, disablePadding: false, label: 'Thema' },
    { id: 'kategorie', numeric: false, disablePadding: false, label: 'Kategorie' },
    { id: 'erstellt', numeric: false, disablePadding: false, label: 'Erstellt' },
    { id: 'bearbeitet', numeric: false, disablePadding: false, label: 'Bearbeitet' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: '', flexDirection: "column" }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" className={"progress p" + props.value} {...props} />
            </Box>
            <Box sx={{ minWidth: 35, marginTop: "0.3rem" }}>
                <Typography variant="body2" >{props.status}</Typography>
            </Box>
        </Box>
    );
}



function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'left' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id && false ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: "white",
                backgroundColor: "var(--blue) !important",
            }
            : {
                color: "var(--blue)",
                backgroundColor: "var(--blue) !important",
            },
    title: {
        flex: '1 1 100%',
    },
}));

const handleFilterBtnClick = () => {
    document.getElementById("SidebarRight").classList.toggle("isOut");
}


export default function Main() {
    const classes = useToolbarStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('nr');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showDialog, setShowDialog] = useState(false);
    const [showNewTicketDialog, setShowNewTicketDialog] = useState(false);
    const [toShowRow, setToShowRow] = useState(rows[0]);
    const [creationMode, setCreationMode] = useState(false);
    const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
    const [sync, setSync] = useState(true);
    const [themeColor, setThemeColor] = useState("")

    useEffect(() => {
        const _fetch = async () => {
            try {
                const data = await fetch(`http://${process.env.REACT_APP_IP_BACKEND}/api/tickets`, { method: "GET" });
                const json = await data.json();
                setRows(json);
                setToShowRow(json[0]);
            } catch {

            }
        }
        _fetch();
    }, [sync]);

    const handleClickAddTicket = () => {
        setShowNewTicketDialog(true);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const prioSwitch = (p) => {
        var className = "priority ";
        switch (p) {
            case 1:
                className += "low";
                break;
            case 2:
                className += "medium";
                break;
            case 3:
                className += "high";
                break;
            default:
                className += "low";
                break;
        }
        return <PriorityHighIcon className={className}></PriorityHighIcon>
    }

    const statusSwitch = (s) => {
        switch (s) {
            case 1:
                return "Neu";
            case 2:
                return "In Bearbeitung von:";
            case 3:
                return "Fertig gestellt von:";
            default:
                return "Neu";
        }
    }


    const handleClickThema = (row) => {
        setToShowRow(row);
        setCreationMode(!creationMode);
        setShowDialog(true);
    }

    const switchProgress = (p) => {
        switch (p) {
            case 1:
                return 5;
            case 2:
                return 30;
            case 3:
                return 100;
            default:
                return 0;
        }
    }

    const handleSettings = () => {
        setOpenSettingsDialog(true);
    }

    const handleThemeColorChange = (e) => {
        setThemeColor(e.target.value)
        document.documentElement.style.setProperty("--blue", e.target.value)
    }

    const handleDeleteTicket = () => {
        console.log(selected)
        for (var i = 0; i < selected.length; i++) {
            fetch(`http://${process.env.REACT_APP_IP_BACKEND}/api/ticket/delete/${selected[i]}`, { method: "DELETE" });
        }
        setSync(!sync);
    }

    return (
        <div className="Main">
            <Dialog open={openSettingsDialog} className="dialog-settings">
                <FormControl className="form-settings">
                    <InputLabel id="demo-simple-select-helper-label">Theme-Farbe auswählen</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value=""
                        label="Age"
                        onChange={handleThemeColorChange}
                        style={{ backgroundColor: themeColor }}
                    >
                        <MenuItem style={{ backgroundColor: "var(--blue2)" }} value="var(--blue2)"></MenuItem>
                        <MenuItem style={{ backgroundColor: "var(--darkblue)" }} value="var(--darkblue)"></MenuItem>
                        <MenuItem style={{ backgroundColor: "var(--green)" }} value="var(--green)"></MenuItem>
                        <MenuItem style={{ backgroundColor: "var(--orange)" }} value="var(--orange)"></MenuItem>
                        <MenuItem style={{ backgroundColor: "var(--red)" }} value="var(--red)"></MenuItem>
                        <MenuItem style={{ backgroundColor: "var(--purple)" }} value="var(--purple)"></MenuItem>
                    </Select>
                </FormControl>
            </Dialog>
            {toShowRow ? <ViewTicketAlert setSync={setSync} sync={sync} setCreationMode={setCreationMode} creationMode={creationMode} ticket={toShowRow} showDialog={showDialog} setShowDialog={setShowDialog} /> : null}
            <NewTicketAlert sync={sync} setSync={setSync} setShowNewTicketDialog={setShowNewTicketDialog} showNewTicketDialog={showNewTicketDialog} />
            <Paper className={classes.paper}>
                <Toolbar
                    className={clsx(classes.root, {
                        [classes.highlight]: selected.length > 0,
                    })}
                >
                    {selected.length > 0 ? (
                        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                            {selected.length} Reihe(n) ausgewählt
                        </Typography>
                    ) : (
                        <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
                            <span style={{ color: "var(--blue)" }}>Ticketsystem</span>
                        </Typography>
                    )}
                    {selected.length < 1 ?
                        <Button
                            className="add-ticket-btn"
                            variant="outlined"
                            endIcon={<AddIcon />}
                            onClick={handleClickAddTicket}
                        >
                            Neues Ticket anlegen
                        </Button> : null
                    } {selected.length < 1 ?

                        <Tooltip title="Einstellungen">
                            <IconButton aria-label="" onClick={handleSettings}>
                                <SettingsIcon className="SyncIcon" />
                            </IconButton>
                        </Tooltip> : null
                    }

                    {selected.length < 1 ?
                        <Tooltip title="Aktualisieren">
                            <IconButton aria-label="" onClick={() => setSync(!sync)}>
                                <SyncIcon className="SyncIcon" />
                            </IconButton>
                        </Tooltip> : null
                    }
                    {
                        selected.length > 0 ? (
                            <div className="selected-icons">
                                <Tooltip title="Löschen">
                                    <IconButton aria-label="delete" onClick={handleDeleteTicket}>
                                        <DeleteIcon className="deleteIcon" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ) : (
                            <Tooltip title="Filter">
                                <IconButton aria-label="filter" className="filter-btn" onClick={handleFilterBtnClick}>
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                        )
                    }
                </Toolbar >
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell align="left" component="th" id={labelId} scope="row" padding="none">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">
                                                {prioSwitch(row.prioritaet)}
                                            </TableCell>
                                            <TableCell align="left">
                                                <p className="thema" onClick={() => handleClickThema(row)}>{row.thema}</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <p className={`kategorie ${row.kategorie.toLowerCase()}`}>{row.kategorie}</p>
                                            </TableCell>
                                            <TableCell align="left">{row.erstellt + " von " + row.erstellt_von}</TableCell>
                                            <TableCell align="left">{row.bearbeitet + " von " + row.bearbeitet_von}</TableCell>
                                            <TableCell align="left" className="status-wrapper">
                                                <Box sx={{ width: '100%' }}>
                                                    <LinearProgressWithLabel value={switchProgress(row.status)} status={statusSwitch(row.status)} />
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={5}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div >
    );
}