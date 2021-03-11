import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import face3 from "../../assets/img/faces/face-3.jpg"
import configJson from "../../assets/config.json";

export default function ConnectedClient(props) {
    return (
        <div className="card card-user">
            <div className="card-image">
                <img
                    src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                    alt="..."/>
            </div>
            <div className="card-body">
                <div className="author">
                    <img className="avatar border-gray" src={face3} alt="..."/>
                    <h5 className="title">{props.user.name}</h5>
                    <p className="description">
                        {props.user.email}
                    </p>
                </div>
                <p className="description text-center">
                    {props.user.password}
                </p>
            </div>
            <hr/>
            <div className="button-container mr-auto ml-auto">
                {props.user.isAdmin ? "Admin": "not Admin"}

                {"  connected  "}

            </div>

        </div>
    )
}

