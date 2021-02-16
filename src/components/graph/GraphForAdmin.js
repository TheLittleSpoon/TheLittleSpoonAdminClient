import * as d3 from "d3";
import {useEffect} from "react";

function GraphForAdmin(props) {


    useEffect(() => {
        const h = props.height;
        const w = props.width;

        const data = props.data;
        const svg = d3.select("#body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("margin-left", 100);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green")

        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text((d) => d)
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - (10 * d) - 3)


    })

    return (
        <div id="body" class="col-md-4">
        </div>
    )

}

export default GraphForAdmin;
