import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/dashboard/Sidebar";
import Main from "./components/dashboard/Main";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import io from "socket.io-client";

import {useEffect, useState} from "react";


function App() {
    useEffect(() => {

    });

    return (
    <div className="wrapper">
      <Router>
        <Sidebar />
        <Route path='/' render={(props)=> {
            return <Main {...props}  />
        }} />
      </Router>
    </div>
  );
}

export default App;
