import React, { useEffect } from 'react'
import {Link, NavLink} from "react-router-dom";
import socket from "../socketManager/socketManager"

function isConnected() {
    return socket.connected ? "conneceted": "not conneceted";
}

function Sidebar() {
        useEffect(()=> {
            console.log(socket)
        });

        return <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="logo">
                    <Link to='/' className="simple-text">
                       Little Spoon Admin
                    </Link>
                    <div className="connection">
                        {isConnected()}
                    </div>
                </div>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/GraphData'>
                            <i className="nc-icon nc-chart-pie-35"></i>
                            <p>Graph Data</p>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/connectedClients'>
                            <i className="nc-icon nc-circle-09"></i>
                            <p>Connected clients</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
}

export default Sidebar
