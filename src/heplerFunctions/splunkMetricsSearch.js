import { getDate } from "./getDate";

export async function splunkSampleSearch() {
    const response = await fetch("http://localhost:3001/splunk-metrics-search");
    const results = await response.json();
    console.log("results --> ", results);

    // Push individual points into data
    var chartData = []
    var _d = results.rows;
    for (let i in _d) {
        console.log("_d[i][0].split('+')[0] --> ", _d[i][0].split('+')[0])
        chartData.push({
            date: getDate(_d[i][0].split('+')[0]),  // Clean up dates with trailing GMT offsets
            avgcpu: parseFloat(_d[i][1])
        })
    }

    console.log("chartData --> ", chartData)
    return chartData
}
