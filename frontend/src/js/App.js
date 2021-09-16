import '../css/App.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Main from './Main';

export default function App() {
       return (
              <div className="App">
                     <Sidebar />
                     <div className="main-wrapper">
                            <Topbar />
                            <Main />
                     </div>
              </div>
       );
}


