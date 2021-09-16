import "../css/Alert.scss"
import {
       MenuItem, TextField, FormControl, InputLabel, Select,
       InputAdornment, Button, ButtonGroup, OutlinedInput,
       Dialog,
} from '@material-ui/core'
import PriorityHighIcon from "@material-ui/icons/PriorityHigh"
import CreateIcon from "@material-ui/icons/Create"
import SaveIcon from "@material-ui/icons/Save"
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloseIcon from "@material-ui/icons/Close"
import { useState } from "react";

export default function Alert(props) {

       console.log(props.row)

       const [isEditing, setEditing] = useState(true);
       const [personName, setPersonName] = useState([]);

       const toggleEditing = () => {
              if (!isEditing) {
                     //SPEICHERN
              }

              setEditing(!isEditing);
       }

       const handleExit = () => {
              props.setShowDialog(false);
              setEditing(true);
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

       const handleChangePrio = (e) => props.setPrio(e.target.value);

       const handleTFThema = (e) => props.setTextThema(e.target.value);

       const handleChangeVerantwortlich = (e) => {
              const { target: { value }, } = e;
              props.setPersonName(typeof value === 'string' ? value.split(',') : value,);
       }

       const names = [
              "Jan Hublitz",
              "Ralf Hublitz",
              "Andrea Reichenauer"
       ];


       return (
              <Dialog
                     open={props.showDialog}
                     onClose={handleExit}
                     aria-labelledby="alert-dialog-title"
                     aria-describedby="alert-dialog-description"
                     className="Dialog"
              >
                     <div className="Swal">
                            <div className="swal-prio-thema-wrapper">
                                   <FormControl fullWidth className="swal-prio-select">
                                          <InputLabel id="demo-simple-select-helper-label">Priorität</InputLabel>
                                          <Select
                                                 labelId="demo-simple-select-helper-label"
                                                 id="demo-simple-select-helper"
                                                 value={props.prio}
                                                 defaultValue={props.row.prio}
                                                 disabled={isEditing}
                                                 onChange={handleChangePrio}
                                          >
                                                 <MenuItem value={1}><PriorityHighIcon className="priority low" /> </MenuItem>
                                                 <MenuItem value={2}><PriorityHighIcon className="priority medium" /> </MenuItem>
                                                 <MenuItem value={3}><PriorityHighIcon className="priority high" /> </MenuItem>
                                          </Select>
                                   </FormControl>
                                   <TextField
                                          disabled={isEditing}
                                          id="outlined-disabled"
                                          label={`Ticket #${props.row.nr}`}
                                          defaultValue={props.row.thema}
                                          className="swal-thema-tf"
                                          onChange={handleTFThema}
                                   />
                            </div>
                            <TextField
                                   id="outlined-multiline-static"
                                   label="Beschreibung"
                                   multiline
                                   disabled={isEditing}
                                   rows={4}
                                   variant="filled"
                                   defaultValue="Lorlisis arcu et dictum finibus. Nam urna tortor, feugiat non mauris quis, acc sapien, sit amet suscipit urna."
                                   className="swal-beschreibung-tf"
                            />
                            <div className="status-wrapper">
                                   <TextField className="swal-status-select"
                                          label="Status"
                                          id="demo-simple-select-helper"
                                          value={statusSwitch(props.row.status)}
                                          disabled
                                   />
                                   <ButtonGroup
                                          variant="text"
                                          aria-label="outlined button group"
                                          disabled={isEditing}
                                          className="status-btngrp"
                                   >
                                          <Button className="status-btngrp-btn" onClick={() => props.row.setStatus(1)}>Als neu markieren</Button>
                                          <Button className="status-btngrp-btn" onClick={() => props.row.setStatus(2)}>Ticket bearbeiten</Button>
                                          <Button className="status-btngrp-btn" onClick={() => props.row.setStatus(3)}>Als fertig markieren</Button>
                                   </ButtonGroup>
                            </div>

                            <FormControl className="verwantwortlich-select">
                                   <InputLabel className="label" id="demo-multiple-name-label">Verwantwortlich:</InputLabel>
                                   <Select
                                          labelId="demo-multiple-name-label"
                                          id="demo-multiple-name"
                                          multiple
                                          disabled={isEditing}
                                          value={personName}
                                          onChange={handleChangeVerantwortlich}
                                          input={<OutlinedInput label="Verantwortlich:" />}
                                   >
                                          {names.map((name) => (
                                                 <MenuItem
                                                        key={name}
                                                        value={name}
                                                 >
                                                        {name}
                                                 </MenuItem>
                                          ))}
                                   </Select>
                            </FormControl>


                            <div className="swal-account-wrapper">
                                   <TextField
                                          id="input-with-icon-textfield"
                                          disabled
                                          label="Erstellt von:"
                                          InputProps={{
                                                 startAdornment: (
                                                        <InputAdornment position="start">
                                                               <AccountCircle />
                                                        </InputAdornment>
                                                 ),
                                          }}
                                          variant="standard"
                                          defaultValue="Jan Hublitz 21.09.2021"
                                          className="swal-erstellt-tf"
                                   />
                                   <TextField
                                          id="input-with-icon-textfield"
                                          disabled
                                          label="Bearbeitet von:"
                                          InputProps={{
                                                 startAdornment: (
                                                        <InputAdornment position="start">
                                                               <AccountCircle />
                                                        </InputAdornment>
                                                 ),
                                          }}
                                          variant="standard"
                                          defaultValue="Jan Hublitz 21.09.2021"
                                          className="swal-bearbeitet-tf"
                                   />
                            </div>

                            <div className="swal-footer-buttons-wrapper">
                                   <Button className="swal-bearbeiten-btn" variant="outlined" endIcon={isEditing ? <CreateIcon /> : <SaveIcon />} onClick={toggleEditing}>
                                          {isEditing ? "Bearbeiten" : "Speichern"}
                                   </Button>
                                   <Button className="swal-schliessen-btn" variant="contained" endIcon={<CloseIcon />} onClick={handleExit}>
                                          Schließen
                                   </Button>
                            </div>
                     </div>
              </Dialog>
       );
}