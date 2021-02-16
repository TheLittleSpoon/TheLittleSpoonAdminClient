import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <div className="wrapper">
      <Router>
        <Sidebar />
        <Route path='/' component={Main} />
      </Router>
    </div>
  );
}

export default App;
