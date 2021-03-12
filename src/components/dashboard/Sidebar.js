import React, {useEffect, useState} from 'react'
import {Link, NavLink} from "react-router-dom";
import io from "socket.io-client";
import configJson from "../../assets/config.json";

let socket = io(configJson.SERVER_URL).connect();


function Sidebar() {
    useEffect(() => {
        socket.on('connect', () => {
            console.log("conneceted");
            setConnected(true);
        });

        socket.on('joined', (users) => {
            console.log(users)
        })

        socket.on('disconnectedUser', (users) => {
            console.log(users)
        })

        socket.on('disconnect', (reason) => {
            setConnected(false);

            if (reason === 'io server disconnect') {
                // the disconnection was initiated by the server, you need to reconnect manually
                socket.connect();
            }
            // else the socket will automatically try to reconnect
        });
    });
    const [connected, setConnected] = useState(false);
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
                        <i className="nc-icon nc-circle-09"></i>
                        <p>Categories</p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/recipes'>
                        <i className="nc-icon nc-circle-09"></i>
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
