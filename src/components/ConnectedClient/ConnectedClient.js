import React from 'react'
import {Link} from 'react-router-dom'
import face3 from "../../assets/img/faces/face-3.jpg"

export default function ConnectedClient() {
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
                    <h5 className="title">Mike Andrew</h5>
                    <p className="description">
                        michael24
                    </p>
                </div>
                <p className="description text-center">
                    "Lamborghini Mercy
                    <br/> Your chick she so thirsty
                    <br/> I'm in that two seat Lambo"
                </p>
            </div>
            <hr/>
            <div className="button-container mr-auto ml-auto">
                <button className="btn btn-simple btn-link btn-icon">
                    <i className="fa fa-facebook-square"></i>
                </button>
                <button className="btn btn-simple btn-link btn-icon">
                    <i className="fa fa-twitter"></i>
                </button>
                <button className="btn btn-simple btn-link btn-icon">
                    <i className="fa fa-google-plus-square"></i>
                </button>
            </div>
        </div>
    )
}

