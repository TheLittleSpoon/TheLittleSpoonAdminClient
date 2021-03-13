import * as d3 from "d3";
import {useEffect, useState} from "react";
import configJson from "../../assets/config.json";
import {window as currentEvent} from 'd3-selection';

function GraphForAdmin(props) {
    let svgRecipies;
    let svgClients

    const h = props.height;
    const w = props.width;

    // const data = props.data;

    function createRecipesGraph(data) {
        if (!d3.select(".recipesGraph").node()) {
            svgRecipies = d3.select("#recipesGraph")
                .append("svg")
                .attr("width", 700)
                .attr("height", h)
                .attr("class", "recipesGraph")
                .style("margin-left", 100);


            svgRecipies.selectAll("rect")
                .data(data.slice(0, 5))
                .enter()
                .append("rect")
                .attr("x", (d, i) => i * 120)
                .attr("y", (d, i) => h - 2 * d.value)
                .attr("width", 115)
                .attr("height", (d, i) => d.value * 2)
                .attr("fill", "green")

            let texts = svgRecipies.selectAll("text")
                .data(data.slice(0, 5))
                .enter();

            texts.append("text")
                .text((d) => d.name)
                .attr("x", (d, i) => i * 120)
                .attr("y", (d, i) => h - 40)

            texts.append("text")
                .text((d) => d.value)
                .attr("x", (d, i) => i * 120)
                .attr("y", (d, i) => h - (d.value * 2 + 3) - 3)


        }
    }

    function createClientsGraph(data) {
        if (!d3.select(".clientsGraph").node()) {


            const margin = {
                top: 50, right: 50, bottom: 50, left: 50,
            };

            const outerRadius = 100;
            const innerRadius = 0

            const colorScale = d3
                .scaleSequential()
                .interpolator(d3.interpolateCool)
                .domain([0, data.slice(0, 3).length]);


            const width = 2 * outerRadius + margin.left + margin.right;
            const height = 2 * outerRadius + margin.top + margin.bottom;

            let div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            d3.select('#pie-container')
                .select('svg')
                .remove();

            // Create new svg
            const svg = d3
                .select('#pie-container')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            const arcGenerator = d3
                .arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

            const pieGenerator = d3
                .pie()
                .padAngle(0)
                .value((d) => d.value);

            let tooltip = d3.select("body")
                .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .style("background", "#000")
                .text("a simple tooltip");

            const arc = svg
                .selectAll()
                .data(pieGenerator(data.slice(0, 3)))
                .enter();

            // Append arcs
            arc
                .append('path')
                .attr('d', arcGenerator)
                .style('fill', (_, i) => colorScale(i))
                .style('stroke', '#ffffff')
                .style('stroke-width', 0)
                .on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div	.html(d.target.__data__.data.name + "<br/>")
                        .style("left", (d.pageX) + "px")
                        .style("top", (d.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

            // Append text labels
            arc
                .append('text')
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .text((d) => d.data.value)
                .style('fill', "black")
                .attr('transform', (d) => {
                    const [x, y] = arcGenerator.centroid(d);
                    return `translate(${x}, ${y})`;
                });

        }
    }

    const [allUsers, setAllUsers] = useState([]);
    const [allRecipes, setAllRecipes] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    function fetchAllUserData() {
        const requestOptions = {
            method: 'GET'
        };
        return fetch(configJson.SERVER_URL + "api/users", requestOptions)
            .then(res => res.json())

    }

    function fetchAllRecipesData() {
        return fetch(configJson.SERVER_URL + "api/recipes")
            .then(res => res.json())

    }

    function fetchAllCategoriesData() {
        return fetch(configJson.SERVER_URL + "api/categories")
            .then(res => res.json())
    }

    useEffect(() => {
        Promise.all([fetchAllUserData(), fetchAllRecipesData(), fetchAllCategoriesData()]).then((result) => {
            setAllUsers(result[0]);
            setAllRecipes(result[1]);
            setAllCategories(result[2])

            console.log(result[0]);
            console.log(result[1]);
            console.log(result[2]);

            let recipePerUser = [];
            result[0].forEach((user, index) => {
                recipePerUser[index] = {name: user.name, value: 0};
                result[1].forEach(recipe => {
                    if (recipe.author === user._id) {
                        recipePerUser[index].value = recipePerUser[index].value + 1;
                    }
                })
            });

            let categoryPerUser = [];
            result[2].forEach((category, index) => {
                categoryPerUser[index] = {name: category.name, value: 0};
                result[1].forEach(recipe => {
                    if (recipe.categories === category._id) {
                        categoryPerUser[index].value = categoryPerUser[index].value + 1;
                    }
                })
            });

            createRecipesGraph(recipePerUser.sort((a, b) => b.value - a.value));
            createClientsGraph(categoryPerUser.sort((a, b) => b.value - a.value));
        });
    }, []);

    return (
        <div>
            <h1>Recipes per users Graphs</h1>
            <div id="recipesGraph" className="col-md-4"></div>
            <h1>Recipes per category</h1>
            <div id="pie-container" className="col-md-4"></div>
        </div>
    )

}

export default GraphForAdmin;
