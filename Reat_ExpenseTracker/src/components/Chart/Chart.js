import React from "react";
import ChartBar from "./ChartBar";
import './Chart.css';

const Chart = (props) => {

    // find the max expense accross all months
    const values = props.dataPoints.map(dataPoint => dataPoint.value); // only keep the expenses amount; remove months
    const max = Math.max(...values);

    return <div className="chart">
        {props.dataPoints.map(e => <ChartBar key={e.label} value={e.value} maxValue={max} label={e.label}/>)}
    </div>
};

export default Chart;