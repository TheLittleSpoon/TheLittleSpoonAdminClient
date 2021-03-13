import React, { Component } from 'react'
import Navbar from "./Navbar";
import { Switch, Route, Redirect } from 'react-router-dom'
import Footer from "./Footer";
import UserProfile from "../connectedClient/UserProfile";
import Dashboard from "./Dashboard";
import Categories from "../categories/Categories";
import Recipes from "../recipes/Recipes";

function Main(props) {
        let myProps = props;
        window.addEventListener('message', ev => {
                if (ev.data) {
                    localStorage.setItem("token", ev.data);
                } else {
                    localStorage.removeItem("token");
                }
        });

        return <div className="main-panel">
                <Navbar />
                <Switch>
                    <Route path="/GraphData" render={(props)=> {
                        return <Dashboard {...props} />
                    }} />
                    <Route path="/connectedClients" render={(props)=> {
                        return <UserProfile {...props} socket={myProps.socket}/>
                    }} />
                    <Route path="/categories" render={(props)=> {
                        return <Categories {...props} />
                    }} />
                    <Route path="/recipes" render={(props)=> {
                        return <Recipes {...props} />
                    }} />
                    <Redirect from='/' to='/connectedClients' />
                </Switch>
                <Footer />
        </div>
}

export default Main
