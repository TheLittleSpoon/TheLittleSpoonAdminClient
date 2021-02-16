import React, { useEffect } from 'react'
import {Link, NavLink} from "react-router-dom";
import socket from "../socketManager/socketManager"

function isConnected() {
    return socket.connected ? "true": "false";
}

function Sidebar() {
        useEffect(()=> {
            console.log(socket)
        });

        return <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="logo">
                    <Link to='/' className="simple-text">
                        Simple Dashboard
                    </Link>
                    <div>
                        {isConnected()}
                    </div>
                </div>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/dashboard'>
                            <i className="nc-icon nc-chart-pie-35"></i>
                            <p>Dashboard</p>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/profile'>
                            <i className="nc-icon nc-circle-09"></i>
                            <p>User Profile</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
}

export default Sidebar
