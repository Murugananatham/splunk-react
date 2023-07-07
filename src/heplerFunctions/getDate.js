import * as d3 from "d3"

export const getDate = function (d) {
    // Date parser
    console.log("d is this --> ",d)
    var timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S.%L");
    return timeParse(d);
};