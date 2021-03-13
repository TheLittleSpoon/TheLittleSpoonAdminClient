import React, {useEffect, useState} from 'react'
import {Link, NavLink} from "react-router-dom";
import io from "socket.io-client";
import configJson from "../../assets/config.json";
let mySocket = io(configJson.SERVER_URL).connect();

function Sidebar(props) {
    const [connected, setConnected] = useState(false);
    const [connectedUsers, setConnectedUsers] = useState(0);

    useEffect(() => {
        mySocket.on('connect', () => {
            console.log("conneceted");
            setConnected(true);
        });

        mySocket.on('joined', (users) => {
            setConnectedUsers(users.length);
        })

        mySocket.on('disconnectedUser', (users) => {
            setConnectedUsers(users.length);
        })

        mySocket.on('disconnect', (reason) => {
            setConnected(false);

            if (reason === 'io server disconnect') {
                // the disconnection was initiated by the server, you need to reconnect manually
                mySocket.connect();
            }
            // else the socket will automatically try to reconnect
        });
    }, [])


    return <div className="sidebar">
        <div className="sidebar-wrapper">
            <div className="logo">
                <Link to='/' className="simple-text">
                    Little Spoon Admin
                </Link>
                <center>
                    <div className="connection">
                        {connected ? "Connected To Server" : "Not connected to server"}
                    </div>
                    <div className="connection">
                        connected users number: {connectedUsers}
                    </div>
                </center>
            </div>
            <ul className="nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to='/connectedClients'>
                        <i className="nc-icon nc-circle-09"></i>
                        <p>Connected clients</p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/categories'>
                        <i className="nc-icon nc-favourite-28"></i>
                        <p>Categories</p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/recipes'>
                        <i className="nc-icon nc-apple"></i>
                        <p>Recipes</p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/GraphData'>
                        <i className="nc-icon nc-chart-pie-35"></i>
                        <p>Graph Data</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    </div>
}

export default Sidebar
