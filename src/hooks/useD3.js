// importing everything from the d3 library
import * as d3 from 'd3';
import React from 'react';

export const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();

    // using the useEffect function so that render will be called every time the components loads
    React.useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => {};
      }, dependencies);
    return ref;
}