import React, { Component } from 'react'
import Navbar from "./Navbar";
import { Switch, Route, Redirect } from 'react-router-dom'
import Footer from "./Footer";
import UserProfile from "./UserProfile";
import Dashboard from "./Dashboard";

function Main() {
        return <div className="main-panel">
                <Navbar />
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/profile" component={UserProfile} />
                    <Redirect from='*' to='/dashboard' />
                </Switch>
                <Footer />
        </div>
}

export default Main
