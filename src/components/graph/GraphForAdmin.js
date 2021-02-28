import * as d3 from "d3";
import {useEffect} from "react";

function GraphForAdmin(props) {
    let svgRecipies;
    let svgClients

    const h = props.height;
    const w = props.width;

    const data = props.data;

    function createRecipesGraph() {
        if (!d3.select(".recipesGraph").node()) {
            svgRecipies = d3.select("#recipesGraph")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("class","recipesGraph")
                .style("margin-left", 100);


            svgRecipies.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", (d, i) => i * 70)
                .attr("y", (d, i) => h - 10 * d)
                .attr("width", 65)
                .attr("height", (d, i) => d * 10)
                .attr("fill", "green")

            svgRecipies.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text((d) => d)
                .attr("x", (d, i) => i * 70)
                .attr("y", (d, i) => h - (10 * d) - 3)
        }
    }

    function createClientsGraph() {
        if (!d3.select(".clientsGraph").node()) {
            svgClients = d3.select("#clientsGraph")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("class", "clientsGraph")
                .style("margin-left", 100);


            svgClients.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", (d, i) => i * 70)
                .attr("y", (d, i) => h - 10 * d)
                .attr("width", 65)
                .attr("height", (d, i) => d * 10)
                .attr("fill", "green")

            svgClients.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text((d) => d)
                .attr("x", (d, i) => i * 70)
                .attr("y", (d, i) => h - (10 * d) - 3)
        }
    }

    useEffect(() => {
        createRecipesGraph();
        createClientsGraph();
    })

    return (
        <div>
            <h1>Recipes Graphs</h1>
            <div id="recipesGraph" class="col-md-4"></div>
            <h1>Clients Graphs</h1>
            <div id="clientsGraph" className="col-md-4"></div>
        </div>
    )

}

export default GraphForAdmin;
