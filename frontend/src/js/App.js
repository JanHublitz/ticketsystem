import '../css/App.scss';
import Sidebar from './SidebarLeft';
import Adminpanel from './Adminpanel/Adminpanel';
import { useEffect, useState } from 'react';
import Ticketsystem from './Ticketsystem/Ticketsystem';
import { SnackbarProvider } from 'notistack';
import Filterbar from './Ticketsystem/Filterbar';
require('dotenv').config()

export default function App() {
       const [view, setView] = useState("Tickets");
       const [MainView, setMainView] = useState(<Ticketsystem />)
       const [isMainView, setIsMainView] = useState(true);

       useEffect(() => {
              switch (view) {
                     case "Tickets":
                            setMainView(<Ticketsystem />);
                            setIsMainView(true);
                            break;
                     case "Adminpanel":
                            setMainView(<Adminpanel />);
                            setIsMainView(false);
                            break;
                     default:
                            setMainView(<Ticketsystem />)
                            setIsMainView(true);
                            break;
              }
       }, [view])

       return (
              <SnackbarProvider>
                     <div className="App">
                            <Sidebar setView={setView} />
                            <div className="main-wrapper">
                                   <div className="main-sidebar-wrapper">
                                          {MainView}
                                          {isMainView ? <Filterbar /> : null}
                                   </div>
                            </div>
                     </div>
              </SnackbarProvider>
       );
}


