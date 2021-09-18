import "../../css/Ticketsystem/Alerts.scss"
import {
       TextField, Select, OutlinedInput, InputLabel, MenuItem, FormControl,
       Button, Dialog, Switch, FormGroup, FormControlLabel
} from '@material-ui/core'
import ToggleButton from "@mui/material/ToggleButton"
import PriorityHighIcon from "@material-ui/icons/PriorityHigh"
import SaveIcon from "@material-ui/icons/Save"
import CloseIcon from "@material-ui/icons/Close"
import { useState } from "react";
import { useSnackbar } from 'notistack';
import UploadFileIcon from "@material-ui/icons/CloudUpload"
import ImageIcon from '@material-ui/icons/Image';
import pdfImage from "../../assets/pdf.png";
import wordImage from "../../assets/word.png";
import excelImage from "../../assets/excel.png";
import AttachFileIcon from "@material-ui/icons/AttachFile"


export default function NewTicketAlert(props) {

       const { enqueueSnackbar } = useSnackbar();

       const defaultTicketValues = {
              id: null,
              prioritaet: 1,
              status: 1,
              kategorie: 1,
              thema: "",
              beschreibung: "",
              verantwortlich: [],
              erstellt: "",
              bearbeitet: ""
       }

       const [ticket, setTicket] = useState(defaultTicketValues);
       const [errorThema, setErrorThema] = useState(true);
       const [errorBeschreibung, setErrorBeschreibung] = useState(true);
       const [showFileUpload, setShowFileUpload] = useState(false);
       const [files, setFiles] = useState({});

       const handleExit = () => {
              props.setShowNewTicketDialog(false);
              setTicket(defaultTicketValues);

              resetStates();
       }

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


       const handleChangePrio = (e) => {
              setTicket({ ...ticket, prioritaet: e.target.value });
       }

       const handleTFThema = (e) => {

              if (e.target.value.trim().length < 1 || e.target.value === "") {
                     setErrorThema(true);
              } else {
                     setErrorThema(false);
              }
              setTicket({ ...ticket, thema: e.target.value });
       }

       const handleChangeVerantwortlich = (e) => {
              setTicket({ ...ticket, verantwortlich: e.target.value });
       }

       const handleChangeBeschreibung = (e) => {

              if (e.target.value.trim().length < 1 || e.target.value === "") {
                     setErrorBeschreibung(true);
              } else {
                     setErrorBeschreibung(false);
              }

              setTicket({ ...ticket, beschreibung: e.target.value });
       }

       const handleChangeKategorie = (e) => {
              setTicket({ ...ticket, kategorie: e.target.value })
       }

       const handleNewTicket = (e) => {
              const d = new Date();
              var day = d.getDate();
              var month = d.getMonth() + 1;
              month = month.toString().length === 1 ? "0" + month : month;
              var hour = d.getHours();
              var minute = d.getMinutes();
              minute = minute.toString().length === 1 ? "0" + minute : minute;

              var json = {
                     "thema": ticket.thema,
                     "prioritaet": ticket.prioritaet,
                     "beschreibung": ticket.beschreibung,
                     "kategorie": kategorieSwitch(ticket.kategorie),
                     "status": ticket.status,
                     "verantwortlich": ticket.verantwortlich.join(";"),
                     "erstellt": `${day}.${month} ${hour}:${minute}`,
                     "erstellt_von": "Jan Hublitz hardcoded",
                     "bearbeitet": `${day}.${month} ${hour}:${minute}`,
                     "bearbeitet_von": "Jan Hublitz hardcoded"
              }

              fetch("http://192.168.176.135:3001/api/ticket/add", {
                     method: "POST",
                     headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                     },
                     body: JSON.stringify(json)
              }).then(response => {
                     var message;
                     if (response.status === 200) {
                            message = "Ticket erfolgreich erstellt";

                            enqueueSnackbar(message, {
                                   variant: 'success',
                                   autoHideDuration: 3000
                            });
                     } else {
                            message = "Error bei Ticketerstellung";

                            enqueueSnackbar(message, {
                                   variant: 'error',
                                   autoHideDuration: 3000
                            });
                     }
                     setTicket(defaultTicketValues)
              })
              props.setSync(!props.sync)
              props.setShowNewTicketDialog(!props.showNewTicketDialog)
       }

       const resetStates = () => {
              setErrorThema(true);
              setErrorBeschreibung(true);
              setShowFileUpload(false);
       }

       const handleFileSwitchChange = () => {
              setShowFileUpload(!showFileUpload);
              setFiles({})
       }

       const handleFileUpload = () => {
              document.getElementById("input-file").click();
       }
       const handleFileDropped = (e) => {
              if (e.target.value) {
                     setFiles({ ...files, [Object.keys(files).length + 1]: e.target.value.split("\\")[2] });
              }
       }

       const getCorrespondingImage = (extension) => {
              var src = ""
              var className = "file-images";
              switch (extension) {
                     case "pdf":
                            src = pdfImage;
                            break;
                     case "docx":
                            src = wordImage;
                            break;
                     case "xlsx":
                            src = excelImage;
                            break;
                     default:
                            return <ImageIcon className={className} />
              }
              return <img src={src} alt="" className={className} />;
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
                                          error={errorThema}
                                          id="outlined-disabled"
                                          label={"Neues Ticket"}
                                          defaultValue=""
                                          className="swal-thema-tf"
                                          onChange={handleTFThema}
                                   />
                            </div>
                            <FormControl className="swal-kategorie-select">
                                   <InputLabel id="demo-simple-select-helper-label">Kategorie</InputLabel>
                                   <Select
                                          labelId="demo-simple-select-helper-label"
                                          id="demo-simple-select-helper"
                                          value={ticket.kategorie}
                                          defaultValue={1}
                                          onChange={handleChangeKategorie}
                                   >
                                          <MenuItem value={1}>Technik</MenuItem>
                                          <MenuItem value={2}>Vertrieb</MenuItem>
                                          <MenuItem value={3}>Lager</MenuItem>
                                          <MenuItem value={4}>GF</MenuItem>
                                   </Select>
                            </FormControl>
                            <TextField
                                   error={errorBeschreibung}
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

                            <ToggleButton
                                   value="check"
                                   variant="outlined"
                                   selected={showFileUpload}
                                   onChange={handleFileSwitchChange}
                                   className="file-togglebtn"
                            >
                                   Dateien einfügen
                                   <AttachFileIcon />
                            </ToggleButton>
                            {showFileUpload ?
                                   <div className="file-upload">
                                          <Button className="file-upload-btn file-upload-proto" type="file" onClick={handleFileUpload}>
                                                 <input
                                                        id="input-file"
                                                        type="file"
                                                        accept=".pdf,.docx,.xlsx,image/*"
                                                        style={{ display: "none" }}
                                                        onChange={handleFileDropped}
                                                 />
                                                 <div className="file-upload-dropzone">
                                                        <UploadFileIcon className="file-upload-icon" />
                                                        <span>Datei hinzufügen</span>
                                                 </div>
                                          </Button>
                                          {Object.keys(files).map(file =>
                                                 <div className="file-upload-files file-upload-proto">
                                                        {getCorrespondingImage(files[file].split(".")[1])}
                                                        <span>{files[file].split(".")[0]}</span>
                                                 </div>
                                          )}

                                   </div> : null}

                            <div className="swal-footer-buttons-wrapper">
                                   {!errorThema && !errorBeschreibung ?
                                          <Button className="swal-bearbeiten-btn" variant="outlined" endIcon={<SaveIcon />} onClick={handleNewTicket}>
                                                 Neues Ticket anlegen
                                          </Button> : null}

                                   <Button className="swal-schliessen-btn" variant="contained" endIcon={<CloseIcon />} onClick={handleExit}>
                                          Schließen
                                   </Button>
                            </div>
                     </div>
              </Dialog>
       );

}