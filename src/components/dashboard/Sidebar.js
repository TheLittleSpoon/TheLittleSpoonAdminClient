import React, {useEffect, useState} from 'react'
import {Link, NavLink} from "react-router-dom";
import io from "socket.io-client";
import configJson from "../../assets/config.json";


function Sidebar(props) {
    return <div className="sidebar">
        <div className="sidebar-wrapper">
            <div className="logo">
                <Link to='/' className="simple-text">
                    Little Spoon Admin
                </Link>
                <center>
                    <div className="connection">
                        {props.connected ? "Connected To Server" : "Not connected to server"}
                    </div>
                    <div className="connection">
                        connected users number: {props.connectedUserNumber}
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
