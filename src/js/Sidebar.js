import { useState } from "react";
import "../css/Sidebar.scss"
import icon from "../assets/align-justify-solid.svg"
import toggleInIconRight from "../assets/angle-double-right-solid.svg"
import toggleInIconLeft from "../assets/angle-double-left-solid.svg"

export default function Sidebar() {

       const [isIn, setIsIn] = useState(false)
       const [items, setItems] = useState(
              { 
                     "Tickets": false,
                     "LoremIpsum1": false,
                     "Loremasdasf": false,
                     "LoasfasfaremIpsum3": false,
                     "Loremafaa": true,
                     "Lorema": false 
              }
       );

       const toggleIsIn = () => {
              setIsIn(!isIn);
       }

       const handleClickItem = (e) => {
              let activeElement;

              for (const key in items) {
                     if( items[key] ) {
                            activeElement = key;
                     }
              }

              if(e === activeElement) {
                     return;
              }

              setItems( {...items, [activeElement] : false, [e] : true})
       }

       return (
              <div className={isIn ? "Sidebar isIn" : "Sidebar"}>
                     <img className="toggleInIcon" src={isIn ? toggleInIconRight : toggleInIconLeft} onClick={toggleIsIn}/>
                     {Object.keys(items).map(item =>
                            <div className={items[item] ? "item active" : "item"} onClick={() => handleClickItem(item)}>
                                   <img src={icon} className="icon" />
                                   <p className="text">{item}</p>
                            </div>
                     )}
              </div >
       );
}