import React, {useState} from 'react';
import './Expenses.css';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChar';

const Expenses = (props) => {

    const [filteredYear, setFilteredyear] = useState('2020');
    const filterChangeHandler = (selectedYear) => {
        setFilteredyear(selectedYear);
    };

    // list of the expenses passed to this function filtered by year
    const filteredExpenses = props.expenses.filter(exp => {
        return exp.date.getFullYear().toString() === filteredYear;
    }); 


 
    return (
        <div>
            <Card className='expenses'>
                <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler}/>
                <ExpensesChart expenses={filteredExpenses}/>
                <ExpensesList items={filteredExpenses}/>
            </Card>
        </div>
    );
}

export default Expenses;