import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/dashboard/Sidebar";
import Main from "./components/dashboard/Main";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import io from "socket.io-client";
import configJson from "./assets/config.json";
import {useEffect, useState} from "react";

let mySocket = io(configJson.SERVER_URL).connect();

function App() {
    useEffect(() => {
        mySocket.on('connect', () => {
            console.log("conneceted");
            setConnected(true);
        });

        mySocket.on('joined', (users) => {
            setConnectedUsers(users);
        })

        mySocket.on('disconnectedUser', (users) => {
            setConnectedUsers(users);
        })

        mySocket.on('disconnect', (reason) => {
            setConnected(false);

            if (reason === 'io server disconnect') {
                // the disconnection was initiated by the server, you need to reconnect manually
                mySocket.connect();
            }
            // else the socket will automatically try to reconnect
        });
    });
    const [connected, setConnected] = useState(false);
    const [connectedUsers, setConnectedUsers] = useState([]);

    return (
    <div className="wrapper">
      <Router>
        <Sidebar socket = {mySocket} connected={connected} connectedUserNumber={connectedUsers.length}/>
        <Route path='/' render={(props)=> {
            return <Main {...props} socket={mySocket}  />
        }} />
      </Router>
    </div>
  );
}

export default App;
