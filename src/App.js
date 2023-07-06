import React, { useEffect, useState } from 'react';
import BarChart from './components/BarChart';
import './App.css';
import * as d3 from 'd3';


function App() {

  // Date parser
  var timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S.%L");
  var getDate = function (d) {
    return timeParse(d);
  };

  const [splunkResults, setSplunkResults] = useState([{ date: getDate("2023-07-01T00:00:00.000+05:30"), avgcpu: 49.56 }]);

  useEffect(() => {
    splunkSampleSearch()
  }, [])

  async function splunkSampleSearch() {
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
    setSplunkResults(chartData)
  }

  return (
    <div className="App">
      <p className='app__title'>Splunk React Integration</p>
      <div className='panel__box'>
        <p className='panel__boxTitle'>Average CPU Usage this month</p>
        <div className='panel__boxChart'>
          <BarChart data={splunkResults} width={1500} height={450} />
        </div>
      </div>
    </div>
  );
}

export default App;
