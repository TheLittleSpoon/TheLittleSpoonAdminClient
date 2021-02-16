import React, { Component } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <nav>
                        <ul className="footer-menu">
                            <li>
                                <Link to="/">
                                    Home
                                </Link>
                            </li>

                        </ul>
                        <p className="copyright text-center">
                            © 2019
                        </p>
                    </nav>
                </div>
            </footer>
        )

}

export default Footer
