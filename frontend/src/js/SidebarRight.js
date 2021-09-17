import { FormControl, InputLabel, Select, OutlinedInput, MenuItem } from "@material-ui/core";
import { useState } from "react";
import "../css/SidebarRight.scss"

export default function SidebarRight() {

       const prios = [
              "Kein Filter",
              "niedrige Priorität",
              "mittlere Priorität",
              "hohe Priorität"
       ]

       const kategorien = [
              "Kein Filter",
              "Technik"
       ]

       const statusse = [
              "Kein Filter",
              "Neu",
              "In Bearbeitung",
              "Fertig"
       ]



       const [prio, setPrio] = useState(0);
       const [kategorie, setKategorie] = useState(0)
       const [status, setStatus] = useState(0);


       const handlePrioChange = (e) => {
              setPrio(e.target.value);
       }

       const handleKategorieChange = (e) => {
              setKategorie(e.target.value);
       }

       const handleStatusChange = (e) => {
              setStatus(e.target.value);
       }

       return (
              <div elevation={1} className="SidebarRight" id="SidebarRight">
                     <p>Filter</p>
                     <FormControl className="form-sidebar-right">
                            <InputLabel id="demo-multiple-name-label">Prioritäten</InputLabel>
                            <Select
                                   labelId="demo-multiple-name-label"
                                   id="demo-multiple-name"
                                   value={prio}
                                   onChange={handlePrioChange}
                                   input={<OutlinedInput label="Prioritäten" />}
                            >
                                   {prios.map((p, index) =>
                                          <MenuItem key={index} value={index}>
                                                 {p}
                                          </MenuItem>
                                   )}
                            </Select>
                     </FormControl>
                     <FormControl className="form-sidebar-right">
                            <InputLabel id="demo-multiple-name-label">Kategorien</InputLabel>
                            <Select
                                   labelId="demo-multiple-name-label"
                                   id="demo-multiple-name"
                                   value={kategorie}
                                   onChange={handleKategorieChange}
                                   input={<OutlinedInput label="Kategorien" />}
                            >
                                   {kategorien.map((k, index) =>
                                          <MenuItem key={index} value={index}>
                                                 {k}
                                          </MenuItem>
                                   )}
                            </Select>
                     </FormControl>
                     <FormControl className="form-sidebar-right">
                            <InputLabel id="demo-multiple-name-label">Status</InputLabel>
                            <Select
                                   labelId="demo-multiple-name-label"
                                   id="demo-multiple-name"
                                   value={status}
                                   onChange={handleStatusChange}
                                   input={<OutlinedInput label="Status" />}
                            >
                                   {statusse.map((s, index) =>
                                          <MenuItem key={index} value={index}>
                                                 {s}
                                          </MenuItem>
                                   )}
                            </Select>
                     </FormControl>
              </div>
       );
}