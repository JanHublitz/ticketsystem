import { React, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
	Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
	TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, Box,
	makeStyles, LinearProgress
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import CreateIcon from '@material-ui/icons/Create';

import "../css/Ticketsystem.scss"
import Alert from './Alert';

function createData(nr, prio, thema, kategorie, datum, autor, status, beschreibung, verantwortlich) {
	return { nr, prio, thema, kategorie, datum, autor, status, beschreibung, verantwortlich };
}

const rows = [
	createData(11, 1, "Kunden wollen dies und das 1 was sollen wir machen", "vertrieb", "21.10.2031", "Jan Hublitz", 1, "beschreibung hier ... :)", ["Jan Hublitz"]),
	createData(1831, 3, "Kunden wollen dies und das 2 was sollen wir machen", "technik", "22.10.2031", "Jan Hublitz", 2, "beschreibung hier ... :)", ["Jan Hublitz"]),
	createData(13, 1, "Kunden wollen dies und das 3 was sollen wir machen", "technik", "27.01.2031", "Jan Hublitz", 1, "beschreibung hier ... :)", ["Jan Hublitz"]),
	createData(2314, 2, "ksdoksad dasoksadsao kdsoda ksadoksdifdjjjddsaj", "gf", "01.01.1999", "dsaasdjdasa", 3, "beschreibung hier ... :)", ["Jan Hublitz"]),
	createData(18311, 3, "Kunden wollen dies und das 4 was sollen wir machen", "lager", "22.10.2031", "Jan Hublitz", 2, "beschreibung hier ... :)", ["Jan Hublitz"]),
];

const headCells = [
	{ id: 'nr', numeric: false, disablePadding: true, label: '#' },
	{ id: 'prio', numeric: true, disablePadding: true, label: 'Priorität' },
	{ id: 'thema', numeric: false, disablePadding: false, label: 'Thema' },
	{ id: 'kategorie', numeric: false, disablePadding: false, label: 'Kategorie' },
	{ id: 'erstellt', numeric: false, disablePadding: false, label: 'Erstellt' },
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
							{orderBy === headCell.id ? (
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
				backgroundColor: "var(--blue)",
			}
			: {
				color: "var(--blue)",
				backgroundColor: theme.palette.secondary.dark,
			},
	title: {
		flex: '1 1 100%',
	},
}));

const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const { numSelected } = props;

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
					{numSelected} Reihe(n) ausgewählt
				</Typography>
			) : (
				<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
					Ticketsystem
				</Typography>
			)}

			{numSelected > 0 ? (
				<div className="selected-icons">
					<Tooltip title="Löschen">
						<IconButton aria-label="delete">
							<DeleteIcon className="deleteIcon" />
						</IconButton>
					</Tooltip>

					{numSelected === 1 ?
						<Tooltip title="Bearbeiten">
							<IconButton aria-label="delete">
								<CreateIcon className="deleteIcon" />
							</IconButton>
						</Tooltip> : null
					}
				</div>
			) : (
				<Tooltip title="Filter">
					<IconButton aria-label="filter">
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}));

export default function Main() {
	const classes = useStyles();
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('nr');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(rows.length);
	const [showDialog, setShowDialog] = useState(false);
	const [toShowRow, setToShowRow] = useState(rows[0]);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name);
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
				className += "low"
				break;
		}
		return <PriorityHighIcon className={className}></PriorityHighIcon>
	}

	const statusSwitch = (s) => {
		switch (s) {
			case 1:
				return "Neu"
			case 2:
				return "In Bearbeitung von:"
			case 3:
				return "Fertig gestellt von:"
			default:
				return "Neu"
		}
	}


	const handleClickThema = (row) => {
		setToShowRow(row);
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

	return (
		<div className="Main">
			<Alert ticket={toShowRow} showDialog={showDialog} setShowDialog={setShowDialog} />
			<Paper className={classes.paper}>
				<EnhancedTableToolbar numSelected={selected.length} />
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
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.nr);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.nr}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													onClick={(event) => handleClick(event, row.nr)}
													checked={isItemSelected}
													inputProps={{ 'aria-labelledby': labelId }}
												/>
											</TableCell>
											<TableCell align="left" component="th" id={labelId} scope="row" padding="none">
												{row.nr}
											</TableCell>
											<TableCell align="left">
												{prioSwitch(row.prio)}
											</TableCell>
											<TableCell align="left">
												<p className="thema" onClick={() => handleClickThema(row)}>{row.thema}</p>
											</TableCell>
											<TableCell align="center">
												<p className={`kategorie ${row.kategorie}`}>{row.kategorie}</p>
											</TableCell>
											<TableCell align="left">{row.datum + " von " + row.autor}</TableCell>
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
					rowsPerPageOptions={[rows.length, 10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}