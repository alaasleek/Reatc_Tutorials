import React from "react";
import Chart from '../Chart/Chart';

const ExpensesChart = (props) => {

    // we need a dataPoint for each month
    const chartDataPoints = [
        {label: 'Jan', value: 0},
        {label: 'Feb', value: 0},
        {label: 'Mar', value: 0},
        {label: 'Apr', value: 0},
        {label: 'May', value: 0},
        {label: 'Jun', value: 0},
        {label: 'Jul', value: 0},
        {label: 'Aug', value: 0},
        {label: 'Sep', value: 0},
        {label: 'Oct', value: 0},
        {label: 'Nov', value: 0},
        {label: 'Dec', value: 0},
    ];

    // get the expenses for each month from the filtered expenses(passsed as prop)
    for(const expense of props.expenses) {
        const month = expense.date.getMonth(); // stating at 0 => jan = 0
        chartDataPoints[month].value += expense.amount;
    }

    return <Chart dataPoints={chartDataPoints}/>
} 

export default ExpensesChart