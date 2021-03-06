import "../../css/Ticketsystem/Alerts.scss"
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
import { useState, useEffect } from "react";

export default function Alert(props) {

       const [ticket, setTicket] = useState(props.ticket);
       const [isEditing, setEditing] = useState(true);
       const [showFazit, setShowFazit] = useState(false);

       useEffect(() => {
              setTicket(props.ticket)
              setTicket({ ...props.ticket, verantwortlich: [] })
       }, [props]);

       const kategorieSwitch = (k) => {
              switch (k) {
                     case 1:
                            return "Technik";
                     case 2:
                            return "Vertrieb";
                     case 3:
                            return "Lager";
                     case 4:
                            return "GF";
                     default:
                            return "Technik"
              }
       }


       const toggleEditing = () => {
              if (!isEditing) {
                     fetch(`http://${process.env.REACT_APP_IP_BACKEND}/api/ticket/update`,
                            {
                                   method: "PUT",
                                   headers: {
                                          'Accept': 'application/json',
                                          'Content-Type': 'application/json'
                                   },
                                   body: JSON.stringify({
                                          "id": ticket.id,
                                          "thema": ticket.thema,
                                          "prioritaet": ticket.prioritaet,
                                          "beschreibung": ticket.beschreibung,
                                          "kategorie": kategorieSwitch(ticket.kategorie),
                                          "status": ticket.status,
                                          "verantwortlich": ticket.verantwortlich.join(";"),
                                          "erstellt": ticket.erstellt,
                                          "erstellt_von": "Jan Hublitz hardcoded",
                                          "bearbeitet": ticket.bearbeitet,
                                          "bearbeitet_von": "Jan Hublitz hardcoded"
                                   })
                            }).then(props.setSync(!props.sync));
              }

              setEditing(!isEditing);
       }

       const handleExit = () => {
              props.setShowDialog(false);
              setEditing(true);
              setShowFazit(false);
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
                            return "Fehler"
              }
       }

       const handleChangePrio = (e) => {
              setTicket({ ...ticket, prioritaet: e.target.value });
       }

       const handleTFThema = (e) => {
              setTicket({ ...ticket, thema: e.target.value });
       }

       const handleChangeVerantwortlich = (e) => {
              setTicket({ ...ticket, verantwortlich: e.target.value });
       }

       const handleChangeBeschreibung = (e) => {
              setTicket({ ...ticket, beschreibung: e.target.value });
       }

       const handleChangeStatus = (num) => {
              setTicket({ ...ticket, status: num });
              if (num === 3) {
                     setShowFazit(true);
              } else {
                     setShowFazit(false)
              }
       }

       const names = [
              "Jan Hublitz",
              "Ralf Hublitz",
              "Andrea Reichenauer",
              "Max Mustermann 1",
              "Max Mustermann 2",
              "Max Mustermann 3",
              "Max Mustermann 4",
              "Max Mustermann 5",
              "Max Mustermann 6",
              "Max Mustermann 7",
              "Max Mustermann 8",
              "Max Mustermann 9",
              "Max Mustermann 10",
              "Max Mustermann 11",
              "Max Mustermann 12",
              "Max Mustermann 13",
              "Max Mustermann 14",
              "Max Mustermann 15",
              "Max Mustermann 16",
              "Max Mustermann 17",
              "Max Mustermann 17",
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
                                          <InputLabel id="demo-simple-select-helper-label">Priorit??t</InputLabel>
                                          <Select
                                                 labelId="demo-simple-select-helper-label"
                                                 id="demo-simple-select-helper"
                                                 value={ticket.prioritaet}
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
                                          label={`Ticket #${ticket.id}`}
                                          defaultValue={ticket.thema}
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
                                   value={ticket.beschreibung}
                                   onChange={handleChangeBeschreibung}
                                   className="swal-beschreibung-tf"
                            />

                            <div className="status-wrapper">
                                   <TextField className="swal-status-select"
                                          label="Status"
                                          id="demo-simple-select-helper"
                                          value={statusSwitch(ticket.status)}
                                          disabled
                                   />
                                   <ButtonGroup
                                          variant="text"
                                          aria-label="outlined button group"
                                          disabled={isEditing}
                                          className="status-btngrp"
                                   >
                                          <Button className="status-btngrp-btn" onClick={() => handleChangeStatus(1)}>Als neu markieren</Button>
                                          <Button className="status-btngrp-btn" onClick={() => handleChangeStatus(2)}>Ticket bearbeiten</Button>
                                          <Button className="status-btngrp-btn" onClick={() => handleChangeStatus(3)}>Als fertig markieren</Button>
                                   </ButtonGroup>
                            </div>

                            {showFazit ? <TextField
                                   id="outlined-multiline-static"
                                   label="Fazit"
                                   multiline
                                   disabled={isEditing}
                                   rows={4}
                                   variant="filled"
                                   value={ticket.fazit || ""}
                                   onChange={() => { }}
                                   className="swal-beschreibung-tf"
                            /> : null}

                            <FormControl className="verwantwortlich-select">
                                   <InputLabel className="label" id="demo-multiple-name-label">Verwantwortlich:</InputLabel>
                                   <Select
                                          labelId="demo-multiple-name-label"
                                          id="demo-multiple-name"
                                          multiple
                                          disabled={isEditing}
                                          value={ticket.verantwortlich}
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
                                          Schlie??en
                                   </Button>
                            </div>
                     </div>
              </Dialog>
       );
}