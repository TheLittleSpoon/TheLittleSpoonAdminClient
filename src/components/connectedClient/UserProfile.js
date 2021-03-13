import React, {useEffect, useState} from 'react'
import ConnectedClient from "./ConnectedClient";
import configJson from "../../assets/config.json";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Search} from "@material-ui/icons";



function UserProfile(props) {
    const [number, setNumber] = useState(0);
    const [checked, setChecked] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [value, setValue] = useState("")
    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
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
    }

    function handleChange(event) {
        setChecked(event.target.checked);
    }

    function deleteUser(user) {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        };
        fetch(configJson.SERVER_URL + "api/users/" + user._id, requestOptions)
            .then(
                (result) => {
                    let newItems = allUsers;
                    let place = -1;
                    newItems.forEach((item, index) => {
                        if (item._id === user._id) {
                            place = index;
                            return;
                        }
                    })
                    if (place !== -1) {
                        newItems.splice(place, 1);
                        setAllUsers([...newItems]);
                    }

                    let newFilteredItems = filteredUsers;
                    let placeFiltered = -1;
                    newFilteredItems.forEach((item, index) => {
                        if (item._id === user._id) {
                            placeFiltered = index;
                            return;
                        }
                    })
                    if (place !== -1) {
                        newFilteredItems.splice(place, 1);
                        setFilteredUsers([...newFilteredItems]);
                    }

                },
                (error) => {
                    alert("error")
                }
            )
    }

    function handleNumberChanged(event) {
        setNumber(event.target.value);
    }

    function filterByParams(event, value, number, checked) {
        const requestOptions = {
            method: 'POST',
            headers:  {'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({name: value, recipeNumber: number ? number : -1, isAdmin: checked})
        };
        fetch(configJson.SERVER_URL + "api/users/byFilter", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    if (result) {
                        setFilteredUsers(result);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                }
            )

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
                    <TextField
                        id="standard-number"
                        label="Recipe Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={number}
                        onChange={handleNumberChanged}
                    />
                    <Button variant="contained" color="primary" onClick={(event) => {
                        filterByParams(event, value, number, checked)
                    }}>
                        <IconButton>
                            <Search/>
                        </IconButton>
                    </Button>
                </div>
                <div className="row">
                    {
                        filteredUsers.map((user, i) => {
                            return (
                                <div className="col-md-4">
                                    <ConnectedClient user={user} deleteUser={deleteUser}/>
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
