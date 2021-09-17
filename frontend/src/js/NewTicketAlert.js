import "../css/Alert.scss"
import {
       MenuItem, TextField, FormControl, InputLabel, Select,
       Button, OutlinedInput,
       Dialog,
       Switch,
       FormGroup,
       FormControlLabel,
} from '@material-ui/core'
import PriorityHighIcon from "@material-ui/icons/PriorityHigh"
import SaveIcon from "@material-ui/icons/Save"
import CloseIcon from "@material-ui/icons/Close"
import { useState } from "react";



export default function NewTicketAlert(props) {

       const [ticket, setTicket] = useState({
              id: null,
              prioritaet: 1,
              status: 1,
              thema: "",
              beschreibung: "",
              verantwortlich: [],
              erstellt: "",
              bearbeitet: ""
       });

       const handleExit = () => {
              props.setShowNewTicketDialog(false);
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

       const names = [
              "Jan Hublitz",
              "Ralf Hublitz",
              "Andrea Reichenauer"
       ];

       return (
              <Dialog
                     open={props.showNewTicketDialog}
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
                                                 value={ticket.prioritaet}
                                                 defaultValue={1}
                                                 onChange={handleChangePrio}
                                          >
                                                 <MenuItem value={1}><PriorityHighIcon className="priority low" /> </MenuItem>
                                                 <MenuItem value={2}><PriorityHighIcon className="priority medium" /> </MenuItem>
                                                 <MenuItem value={3}><PriorityHighIcon className="priority high" /> </MenuItem>
                                          </Select>
                                   </FormControl>
                                   <TextField
                                          id="outlined-disabled"
                                          label={"Neues Ticket"}
                                          defaultValue=""
                                          className="swal-thema-tf"
                                          onChange={handleTFThema}
                                   />
                            </div>
                            <TextField
                                   id="outlined-multiline-static"
                                   label="Beschreibung"
                                   multiline
                                   rows={4}
                                   variant="filled"
                                   value={ticket.beschreibung}
                                   onChange={handleChangeBeschreibung}
                                   className="swal-beschreibung-tf"
                            />

                            <FormControl className="verwantwortlich-select">
                                   <InputLabel className="label" id="demo-multiple-name-label">Verwantwortlich:</InputLabel>
                                   <Select
                                          labelId="demo-multiple-name-label"
                                          id="demo-multiple-name"
                                          multiple
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
                            {
                                   ticket.verantwortlich.length >= 1 ?
                                          <FormGroup>
                                                 <FormControlLabel control={<Switch defaultChecked />} label="Versende Email an jeden Beteiligten" />
                                          </FormGroup>
                                          : null
                            }


                            <div className="swal-footer-buttons-wrapper">
                                   <Button className="swal-bearbeiten-btn" variant="outlined" endIcon={<SaveIcon />} onClick={() => { }}>
                                          Neues Ticket anlegen
                                   </Button>

                                   <Button className="swal-schliessen-btn" variant="contained" endIcon={<CloseIcon />} onClick={handleExit}>
                                          Schließen
                                   </Button>
                            </div>
                     </div>
              </Dialog>
       );

}