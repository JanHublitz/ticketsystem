import '../css/App.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Wiki from './Wiki';
import { useEffect, useState } from 'react';
import Ticketsystem from './Ticketsystem';
import { SnackbarProvider } from 'notistack';
import SidebarRight from './SidebarRight';

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
                     case "Wiki":
                            setMainView(<Wiki />);
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
                                   <Topbar />
                                   <div className="main-sidebar-wrapper">
                                          {MainView}
                                          {isMainView ? <SidebarRight /> : null}
                                   </div>
                            </div>
                     </div>
              </SnackbarProvider>
       );
}


