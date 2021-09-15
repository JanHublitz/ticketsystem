import { useState } from "react";
import "../css/Sidebar.scss"
import icon from "../assets/align-justify-solid.svg"

export default function Sidebar() {

       const [items, setItems] = useState([
              { "Tickets": false },
              { "Lorem Ipsum1": false },
              { "Lorem asdasf": true },
              { "Loasfasfa rem Ipsum3": false },
              { "Lorem afaa": false },
              { "Lorem a": false }
       ]);

       return (
              <div className="Sidebar">
                     {items.map(item =>
                            <div className={item[Object.keys(item)] ? "item active" : "item"}>
                                   <img src={icon} className="icon" />
                                   <p className="text">{Object.keys(item)}</p>
                            </div>
                     )}
              </div >
       );
}