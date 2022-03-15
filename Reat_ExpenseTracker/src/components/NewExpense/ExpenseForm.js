import React, { useState } from "react";
import './ExpenseForm.css';

// the props here are the funtion that will allow us to pass data up to NewExpense
const ExpenseForm = (props) => {

    // we need tree states to record the user input of title, amout, and date
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    /*
    // we can also have all three inputs as one state with three values
    const [userInput, setUserInput] = useState(
        {
            enteredTitle: '',
            enteredAmount: '',
            enteredDate: '',
        }
    );
    */

    // we also need three hadlers for the tree states we have
    // sice this handler will be called from the onChange, then onChange will make sure to pass in the event
    // the event will have the value of input the user will enter(event.target.value).
    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value); // this if we decide to have three separate states 
        /*
        // in case yoy are combining the three inputs in one state
        setUserInput({
            ...userInput, // first we copy the old state to make sure the amount and date are not lost
            enteredTitle: event.target.value
        });

        // a better way of doing this
        setUserInput((prevState) => {
            return {...prevState, enteredTitle: event.target.value};
        });
        */
    }


    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    }


    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    }

    // to handle when the user submit the form
    // we will save the data and clear the form
    const submitHandler = (event) => {
        // this to ensure that we will handle it here(on the frontend)
        // otherwise the page will refresh and a request will be sent to the server by default
        event.preventDefault(); 

        // record the data entered by the user in an object
        // Now we need to pass this data UP (from child "ExpenseForm" to the parent "NewExpense")
        const expenseData = {
            title: enteredTitle,
            amount: +enteredAmount,
            date: new Date(enteredDate)
        };

        // after recording the entered data, Now we need to pass it up to NewExpense
        props.onSaveExpenseData(expenseData);

        // to clear the form after submission
        // empty string will be passed back because wo have two way binding
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredDate("");
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    {/* we pass the enteredTitle bake to the value to do TWO WAY BINDING this allows us to 
                    get data from user and then change it */}
                    <input type='text' value={enteredTitle} onChange={titleChangeHandler} /> 
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type='number' min="0.01" step="0.01" value={enteredAmount} onChange={amountChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type='date' min="2019-01-01" max="2022-12-31" value={enteredDate} onChange={dateChangeHandler} />
                </div>
            </div>

            <div className="new-expense__actions">
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button type="submit">Add Expense</button>
            </div>
        </form>
    )
}

export default ExpenseForm;