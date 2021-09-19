import { useEffect, useState } from "react";
import "../css/SidebarLeft.scss"
import DehazeIcon from "@material-ui/icons/Dehaze";
import DoubleArrowRoundedIcon from "@material-ui/icons/ArrowForwardIos";
import HelpIcon from "@material-ui/icons/Help";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Select from "@material-ui/core/Select"
import { Dialog, MenuItem, TextField } from "@material-ui/core";
import sha256 from "js-sha256";

export default function SidebarLeft(props) {

       const setView = props.setView;
       const [isIn, setIsIn] = useState(false)
       const [items, setItems] = useState(
              {
                     "Tickets": true,
                     "Wiki": false,
              }
       );

       const [users, setUsers] = useState([])
       const [activeUser, setActiveUser] = useState(null);
       const [signInUser, setSignInUser] = useState(null);
       const [openAuthDialog, setOpenAuthDialog] = useState(false);
       const [isAuth, setIsAuth] = useState(false);

       useEffect(() => {
              const _fetch = async () => {
                     const data = await fetch(`http://${process.env.REACT_APP_IP_BACKEND}/api/users`, { method: "GET" });
                     const json = await data.json();
                     setUsers(json);
              }
              _fetch();
       }, [])

       const toggleIsIn = () => {
              setIsIn(!isIn);
       }

       const handleClickItem = (clickedItem) => {
              let activeElement;

              for (const key in items) {
                     if (items[key]) {
                            activeElement = key;
                            break;
                     }
              }

              if (clickedItem === activeElement) {
                     return;
              }

              setItems({ ...items, [activeElement]: false, [clickedItem]: true })
              setView(clickedItem)
       }

       const iconSwitch = (name) => {
              switch (name) {
                     case "Tickets":
                            return <DehazeIcon className="icon" />
                     case "Wiki":
                            return <HelpIcon className="icon" />
                     default:
                            return;
              }
       }

       const handleUserChange = (e) => {
              setOpenAuthDialog(true);
              setSignInUser(e.target.value)
       }

       const handleExit = () => {

       }

       const handlePwTfChange = (eTf) => {
              var auth = sha256(eTf.target.value).toUpperCase() === users[signInUser].hash

              if (auth) {
                     setOpenAuthDialog(false);
                     setActiveUser(signInUser);
              }
              setIsAuth(auth)
       }

       return (
              <>
                     <Dialog
                            open={openAuthDialog}
                            onClose={handleExit}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            className="">
                            <TextField onChange={handlePwTfChange}>

                            </TextField>
                     </Dialog>
                     <div className={isIn ? "Sidebar isIn" : "Sidebar"}>
                            <DoubleArrowRoundedIcon className={isIn ? "toggleInIcon" : "toggleInIcon left"} onClick={toggleIsIn} />
                            <div className="user-wrapper">
                                   <p>{isAuth ? "AUTHENTICATED" : "NOT AUTHENTICATED"}</p>
                                   <AccountCircle className="account-icon" />
                                   {!isIn ?
                                          <Select
                                                 value={users[activeUser]}
                                                 onChange={handleUserChange}
                                          >

                                                 {users.map((user, index) =>
                                                        <MenuItem value={index}>{user.name}</MenuItem>
                                                 )}
                                          </Select> :
                                          users[activeUser].name.split(" ").map(name =>
                                                 <span>{name}</span>
                                          )
                                   }
                            </div>
                            {Object.keys(items).map(item =>
                                   <div key={item} className={items[item] ? "item active" : "item"} onClick={() => handleClickItem(item)}>
                                          {iconSwitch(item)}
                                          <b></b>
                                          <b></b>
                                          <p className="text">{item}</p>
                                   </div>

                            )}
                     </div >
              </>
       );
}