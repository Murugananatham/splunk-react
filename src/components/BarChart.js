import { useD3 } from '../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

// the barchar component which accepts the data
function BarChart({ data, width, height }) {
    const ref = useD3(
        (svg) => {
            const margin = { top: 20, right: 30, bottom: 30, left: 40 };
            const x = d3
                .scaleBand()
                .domain(data.map((d) => d.date))
                .rangeRound([margin.left, width - margin.right])
                .padding(0.1);

            const y1 = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.avgcpu)])
                .rangeRound([height - margin.bottom, margin.top]);

            const xAxis = (g) =>
                g.attr("transform", `translate(0,${height - margin.bottom})`).call(
                    d3
                        .axisBottom(x)
                        .tickFormat(d3.timeFormat("%Y-%m-%d"))
                        .tickSizeOuter(0)
                ).call((g) =>
                    g
                        .append("text")
                        .attr("transform", `translate(${width/2},40)`)
                        .attr("fill", "currentColor")
                        .attr("text-anchor", "start")
                        .text("Time")
                );

            const y1Axis = (g) =>
                g
                    .attr("transform", `translate(${margin.left},0)`)
                    .style("color", "steelblue")
                    .call(d3.axisLeft(y1).ticks(null, "m"))
                    .call((g) => g.select(".domain").remove())
                    .call((g) =>
                        g
                            .append("text")
                            .attr("x", -margin.left)
                            .attr("y", 10)
                            .attr("fill", "currentColor")
                            .attr("text-anchor", "start")
                            .text("% of usage")
                    );

            svg.select(".x-axis").call(xAxis);
            svg.select(".y-axis").call(y1Axis);

            svg
                .select(".plot-area")
                .attr("fill", "steelblue")
                .selectAll(".bar")
                .data(data)
                .join("rect")
                .attr("class", "bar")
                .attr("x", (d) => x(d.date))
                .attr("width", x.bandwidth())
                .attr("y", (d) => y1(d.avgcpu))
                .attr("height", (d) => y1(0) - y1(d.avgcpu));

        },
        [data.length]
    );

    // returning the svg
    return (
        <svg
            ref={ref}
            style={{
                height: 500,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
}

export default BarChart;
