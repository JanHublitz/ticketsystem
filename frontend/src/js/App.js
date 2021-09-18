import '../css/App.scss';
import Sidebar from './SidebarLeft';
import Wiki from './Unterseite 2/Wiki';
import { useEffect, useState } from 'react';
import Ticketsystem from './Ticketsystem/Ticketsystem';
import { SnackbarProvider } from 'notistack';
import Filterbar from './Ticketsystem/Filterbar';


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
                                   <div className="main-sidebar-wrapper">
                                          {MainView}
                                          {isMainView ? <Filterbar /> : null}
                                   </div>
                            </div>
                     </div>
              </SnackbarProvider>
       );
}


