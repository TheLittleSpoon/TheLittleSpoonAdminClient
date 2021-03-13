import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import configJson from "../../assets/config.json";
import {Delete} from "@material-ui/icons";
import {Grid} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function Recipes() {
    const classes = useStyles();
    const [isLoaded, setIsLoaded] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [users, setUsers] = useState([]);
    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {
        fetch(configJson.SERVER_URL + "api/recipes")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setRecipes(result);
                },
                (error) => {
                    setIsLoaded(true);
                }
            )
        let requestOptions = {
            method: 'GET',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        };
        fetch(configJson.SERVER_URL + "api/users", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setUsers(result);
                },
                (error) => {
                    alert("error")
                }
            )

    }, [])


    function deleteFromServer(recipe) {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')},
        };
        fetch(configJson.SERVER_URL + "api/recipes/"+ recipe._id, requestOptions)
            .then(
                (result) => {
                    alert("saved")
                },
                (error) => {
                    alert("error")
                }
            )
    }

    function handleDelete(event, recipe) {
        let newItems = recipes;
        let place  = -1;
        newItems.forEach((item, index) => {
            if (item.name === recipe.name) {
                place = index;
                return;
            }
        })
        if (place !== -1) {
            newItems.splice(place, 1);
            setRecipes([...newItems]);
            deleteFromServer(recipe)
        }
        event.preventDefault();
    }
    const [page, setPage] = useState(1);

    function handleChangePage(event, value) {
        setPage(value);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Pagination count={Math.ceil(recipes.length / 3)} onChange={handleChangePage} />
            </Grid>
            {
                recipes.slice(page*3 - 3, page*3).map(recipe => (
                    <Grid item xs={4}>
                        <Card className={classes.root}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        R
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="delete recipe" edge="end" onClick={(event)=> {handleDelete(event, recipe)}}>
                                        <Delete/>
                                    </IconButton>
                                }
                                title={recipe.name}
                                subheader={users.filter(value => value._id === recipe.author)[0] ? users.filter(value => value._id === recipe.author)[0].name : recipe.author}
                            />
                            <CardMedia
                                className={classes.media}
                                image={recipe.image}
                                title={recipe.name}
                            />
                            <CardContent>
                                <Typography paragraph>Ingredient:</Typography>
                                {recipe.ingredients.map(ingrediant => (
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {ingrediant.name}
                                            {ingrediant.quantity}
                                            {ingrediant.measuringUnit}
                                        </Typography>
                                    )
                                )

                                }
                            </CardContent>
                            <CardContent>
                                <Typography paragraph>Instructions:</Typography>
                                {recipe.instructions.split("\n").map(instruction => (
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {instruction}
                                        </Typography>
                                    )
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>

    );
}
