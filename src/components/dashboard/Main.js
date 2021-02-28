import React, { Component } from 'react'
import Navbar from "./Navbar";
import { Switch, Route, Redirect } from 'react-router-dom'
import Footer from "./Footer";
import UserProfile from "../connectedClient/UserProfile";
import Dashboard from "./Dashboard";
import Categories from "../categories/Categories";

function Main() {
        return <div className="main-panel">
                <Navbar />
                <Switch>
                    <Route path="/GraphData" component={Dashboard} />
                    <Route path="/connectedClients" component={UserProfile} />
                    <Route path="/categories" component={Categories} />
                    <Redirect from='*' to='/connectedClients' />
                </Switch>
                <Footer />
        </div>
}

export default Main
