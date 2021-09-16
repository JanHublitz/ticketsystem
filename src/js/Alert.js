import "../css/Alert.scss"

import SweetAlert2 from "react-bootstrap-sweetalert";
import { MenuItem, TextField, FormControl, InputLabel, Select, InputAdornment, Button } from '@material-ui/core'
import PriorityHighIcon from "@material-ui/icons/PriorityHigh"
import CreateIcon from "@material-ui/icons/Create"
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useState } from "react";

export default function Alert(props) {
       const row = props.row;
       console.log(props.showDialog)
       const [showDialog, setShowDialog] = useState(props.showDialog);
       console.log(showDialog)
       const [isEditing, setEditing] = useState(true);

       const toggleEditing = () => setEditing(!isEditing);


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

       return (
              <SweetAlert2
                     show={showDialog}
                     onConfirm={() => setShowDialog(false)}
              >
                     <div className="Swal">
                            <div className="swal-prio-thema-wrapper">
                                   <FormControl className="swal-prio-select">
                                          <InputLabel id="demo-simple-select-helper-label">Priorität</InputLabel>
                                          <Select
                                                 labelId="demo-simple-select-helper-label"
                                                 id="demo-simple-select-helper"
                                                 value={row.prio}
                                                 defaultValue={row.prio}
                                                 label="Age"
                                                 disabled={isEditing}
                                                 onChange={() => { }}
                                          >
                                                 <MenuItem value={1}><PriorityHighIcon className="priority low" /> </MenuItem>
                                                 <MenuItem value={2}><PriorityHighIcon className="priority medium" /> </MenuItem>
                                                 <MenuItem value={3}><PriorityHighIcon className="priority high" /> </MenuItem>
                                          </Select>
                                   </FormControl>
                                   <TextField
                                          disabled={isEditing}
                                          id="outlined-disabled"
                                          label={`Thema #${row.nr}`}
                                          defaultValue={row.thema}
                                          className="swal-thema-tf"
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
                            <TextField className="swal-status-select"
                                   label="Beschreibung"
                                   id="demo-simple-select-helper"
                                   value={statusSwitch(row.status)}
                                   disabled
                            />

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
                                   <Button className="swal-bearbeiten-btn" variant="contained" endIcon={<CreateIcon />} onClick={toggleEditing}>
                                          Bearbeiten
                                   </Button>
                            </div>
                     </div>
              </SweetAlert2>
       );
}