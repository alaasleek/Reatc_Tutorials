import React from 'react';
import ExpenseItem from './ExpenseItem';
import './ExpensesList.css'

const ExpensesList = (props) => {

    if(props.items.length === 0) {
       return <h2 className='expenses-list__fallback'>Found no expenses</h2>
    }

    return (
        <ul className='expenses-list'> {
            // this how we render a list of elemen. we map each element in the array to a component
            // when maping a list of items we need to provide the item id as prop; this allows to improve performace
            // and also avoid bugs. with out the id React won't be able to tell the difference between the items
            props.items.map(exp => (<ExpenseItem key={exp.id} title={exp.title} amount={exp.amount} date={exp.date}/>))
        }
        </ul>
    );
};

export default ExpensesList; 