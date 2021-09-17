import "../css/Topbar.scss"
import AccountCircle from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings"
import { IconButton } from "@material-ui/core";

export default function Topbar() {
       return (
              <div className="Topbar">
                     <div></div>
                     <div className="wrapper middle">
                            <AccountCircle /> <span style={{ marginLeft: "0.5rem" }}>Jan Hublitz</span>
                     </div>

                     <div className="wrapper end">
                            <IconButton>
                                   <SettingsIcon />
                            </IconButton>

                     </div>
              </div>
       );
}