import {Component, useEffect, useState} from "react";
import configJson from "../../assets/config.json";
import css from "./Categories.css";
import {
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    TextField
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import {Add, Delete, Fastfood, Folder} from "@material-ui/icons";

export default function Categories() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState("");
    const [dense, setDense] = useState(false);

// Note: the empty deps array [] means
// this useEffect will run once
// similar to componentDidMount()
    useEffect(() => {
        fetch(configJson.SERVER_URL + "api/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCategories(result);
                },
                (error) => {
                    setIsLoaded(false);
                }
            )
    }, [Categories])

    function handleChanged(event) {
        setValue(event.target.value);
    }

    function addToServer(cat) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({name: cat.name})
        };
        fetch(configJson.SERVER_URL + "api/categories", requestOptions)
            // .then(res => {
            //     res
            // })
            .then(
                (result) => {
                },
                (error) => {
                    alert("error")
                }
            )
    }

    function handleSubmit(event) {
        let newItems = categories;
        let cat = {name: value};
        newItems.push(cat);
        setCategories(newItems);
        setValue("");
        addToServer(cat)
        event.preventDefault();
    }

    function deleteFromServer(cat) {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                      'x-auth-token': localStorage.getItem('token')
            },
        };
        fetch(configJson.SERVER_URL + "api/categories/" + cat._id, requestOptions)
            .then(
                (result) => {
                },
                (error) => {
                    alert("error")
                }
            )
    }

    function handleDelete(event, cat) {
        let newItems = categories;
        let place  = -1;
        newItems.forEach((item, index) => {
            if (item.name === cat.name) {
                place = index;
                return;
            }
        })
        if (place !== -1) {
            newItems.splice(place, 1);
            setCategories([...newItems]);
            deleteFromServer(cat)
        }
        event.preventDefault();
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <List dense={dense}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Add />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                        <form onSubmit={handleSubmit}>
                            <TextField id="standard-basic" label="Add Category" value={value} onChange={handleChanged} />
                            <Button variant="contained" color="primary" type="submit">
                                <IconButton>
                                    <Add />
                                </IconButton>
                            </Button>
                        </form>
                    </ListItemText>
                </ListItem>
                { categories.map(item => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Fastfood/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.name}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={(event)=> {handleDelete(event, item)}}>
                                <Delete/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    }
}
