import React, {useState} from 'react';
import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';

// the attributs of this funtion will be passed as single a key-vale object; we name it props here
const ExpenseItem = (props) => {

    // this is a hook that must be called only in the component functoin 
    // this function will allow us to change the title. it will return a state variable and a functio to change this state 
    // the title will be initialized from prop.title
    // any variable that we will change and we want to show the changes on the screen must be defined as a state
    const [title, setTitle] = useState(props.title); 

    const clickHandler = () => { // a functio to be executed when we push a button
         // state variable must be change using the set function not by title = 'something'
         // the setTitle will re-render the components where the state is changed so the changes will be
         // visible on the screen 
        setTitle('new Title'); 
    }
    return (
        <li>
            <Card className="expense-item">
                <ExpenseDate date={props.date}/>
                <div className="expense-item__description">
                    <h2>{title}</h2>
                    <div className="expense-item__price">${props.amount}</div>
                </div>
                <button onClick={clickHandler}>Change Title</button>
            </Card>
        </li>
    );
}


export default ExpenseItem;