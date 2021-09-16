import { useState } from "react";
import "../css/Sidebar.scss"
import DehazeIcon from "@material-ui/icons/Dehaze";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import HelpIcon from "@material-ui/icons/Help";

export default function Sidebar() {

       const [isIn, setIsIn] = useState(false)
       const [items, setItems] = useState(
              {
                     "Tickets": true,
                     "Wiki": false,
              }
       );

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
              <div className={isIn ? "Sidebar isIn" : "Sidebar"}>
                     <DoubleArrowIcon className={isIn ? "toggleInIcon" : "toggleInIcon left"} onClick={toggleIsIn} />
                     {Object.keys(items).map(item =>
                            <div key={item} className={items[item] ? "item active" : "item"} onClick={() => handleClickItem(item)}>
                                   {iconSwitch(item)}
                                   <p className="text">{item}</p>
                            </div>
                     )}
              </div >
       );
}