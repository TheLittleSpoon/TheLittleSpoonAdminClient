import React, {useEffect, useState} from 'react'
import ConnectedClient from "./ConnectedClient";
import configJson from "../../assets/config.json";
import userEvent from "@testing-library/user-event";

function UserProfile() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        const requestOptions = {
            method: 'GET'
        };
        fetch(configJson.SERVER_URL + "api/users", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setIsLoaded(true);
                    if(result)
                    setAllUsers(result);
                },
                (error) => {
                    setIsLoaded(true);
                }
            )
    }, []);

        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        {
                         allUsers.map((user, i) => {
                             return (
                                 <div className="col-md-4">
                                     <ConnectedClient user={user} />
                                 </div>
                             )
                         })
                        }
                    </div>
                </div>
            </div>
        )
}

export default UserProfile
