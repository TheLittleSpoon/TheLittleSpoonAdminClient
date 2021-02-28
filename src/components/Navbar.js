import React, { Component } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
        return (
            <nav className="navbar navbar-expand-lg " color-on-scroll="500">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Admin </a>
                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>
                                    <span className="no-icon">Log out</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
}

export default Navbar
