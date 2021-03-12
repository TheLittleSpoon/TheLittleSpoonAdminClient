import React, {useEffect, useState} from 'react'
import ConnectedClient from "./ConnectedClient";
import configJson from "../../assets/config.json";
import userEvent from "@testing-library/user-event";
import {Checkbox, FormControlLabel, FormGroup, TextField} from "@material-ui/core";

function UserProfile() {
    const [checked, setChecked] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [value, setValue] = useState("")
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
                    if (result)
                        setAllUsers(result);
                    setFilteredUsers(result);
                },
                (error) => {
                    setIsLoaded(true);
                }
            )
    }, []);

    function handleChanged(event) {
        setValue(event.target.value);
        if (event.target.value === "") {
            setFilteredUsers(allUsers);
            return;
        }
        let filterUsers = allUsers.filter(filteredUser => {
            return filteredUser.name.toLowerCase().includes(event.target.value.toLowerCase());

        });
        setFilteredUsers(filterUsers);
    }

    function handleChange(event) {
        setChecked(event.target.checked);
        let filterUsers = allUsers.filter(filteredUser => {
            return filteredUser.isAdmin === event.target.checked;

        });
        setFilteredUsers(filterUsers);
    }

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <TextField id="standard-basic" label="Add Category" type="text" value={value}
                               onChange={handleChanged}/>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox checked={checked} onChange={handleChange} name="checkedA"/>}
                            label="isAdmin"
                        />
                    </FormGroup>
                </div>
                <div className="row">
                    {
                        filteredUsers.map((user, i) => {
                            return (
                                <div className="col-md-4">
                                    <ConnectedClient user={user}/>
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
