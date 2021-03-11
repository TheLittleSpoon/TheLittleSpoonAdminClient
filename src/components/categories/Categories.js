import {useEffect, useState} from "react";
import configJson from "../../assets/config.json";
import css from "./Categories.css";

export default function Categories(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState("");

// Note: the empty deps array [] means
// this useEffect will run once
// similar to componentDidMount()
    useEffect(() => {
        fetch(configJson.SERVER_URL + "/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCategories(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setCategories([{id: 1,catName: "Italian"},{ id: 2, catName: "Junk"},{ id: 3, catName: "Burgers"}])
                }
            )
    }, [])

    function handleChanged(event) {
        setValue(event.target.value);
    }

    function handleSubmit(event) {
        alert('A name was submitted: ' + value);
        let newItems = categories;
        newItems.push({id: categories.length + 1, catName: value});
        setCategories(newItems);
        setValue("");
        event.preventDefault();
    }

    function handleDelete(event) {
        let place = event.target.parentElement.ariaLabel;
        let newItems = categories;
        newItems.splice(parseInt(place) - 1, 1);
        setCategories([...newItems]);
        event.preventDefault();
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {categories.map(item => (
                    <li key={item.id} aria-label={item.id} value={item.catName}>
                        {item.catName}
                        <div className="deleteCat" onClick={handleDelete}>
                            X
                        </div>
                    </li>
                ))}
                <li>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" value={value} onChange={handleChanged} />

                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </li>
            </ul>

        );
    }
}
