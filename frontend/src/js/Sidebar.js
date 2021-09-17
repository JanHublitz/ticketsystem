import { Fragment, useState } from "react";
import { Divider } from "@material-ui/core";
import "../css/Sidebar.scss"
import DehazeIcon from "@material-ui/icons/Dehaze";
import DoubleArrowRoundedIcon from "@material-ui/icons/ArrowForwardIos";
import HelpIcon from "@material-ui/icons/Help";
import reactPng from "../assets/react.png";
import muiPng from "../assets/mui.png";
import springbootPng from "../assets/springboot.png";
import mysqlSvg from "../assets/mysql.svg"
import us from "../assets/us.png"
import AccountCircle from "@material-ui/icons/AccountCircle";

export default function Sidebar(props) {

       const setView = props.setView;
       const [isIn, setIsIn] = useState(false)
       const [items, setItems] = useState(
              {
                     "Tickets": true,
                     "Wiki": false,
              }
       );

       const toggleIsIn = () => {
              setIsIn(!isIn);
              //document.documentElement.style.setProperty("--blue", "rgb(255,0,0)")
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

       return (
              <Fragment>
                     {!isIn ? <img src={us} alt="" /> : null}
                     <div className={isIn ? "Sidebar isIn" : "Sidebar"}>
                            <DoubleArrowRoundedIcon className={isIn ? "toggleInIcon" : "toggleInIcon left"} onClick={toggleIsIn} />
                            <div className="user-wrapper">
                                   <AccountCircle className="account-icon" />
                                   {!isIn ? <span >Jan Hublitz</span> : null}
                            </div>
                            {Object.keys(items).map(item =>
                                   <div key={item} className={items[item] ? "item active" : "item"} onClick={() => handleClickItem(item)}>
                                          {iconSwitch(item)}
                                          <p className="text">{item}</p>
                                   </div>
                            )}
                            {/* <Divider /> */}
                            {isIn ? null :
                                   <div className="Sidebar-footer">
                                          <img id="react" className="powered-logo" src={reactPng} alt="" />
                                          <img id="mui" className="powered-logo" src={muiPng} alt="" />
                                          <img id="springboot" className="powered-logo" src={springbootPng} alt="" />
                                          <img id="mysql" className="powered-logo" src={mysqlSvg} alt="" />
                                   </div>}
                     </div >
              </Fragment>
       );
}