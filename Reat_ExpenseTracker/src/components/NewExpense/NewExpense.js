import React, {useState} from 'react';
import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

const NewExpense = (props) => {

    

    // this function is to allow us to pass data up from the ExpenseFprm 
    // the form will pass the data as argument to this function then we will copy the data into new object
    // we will also add an id to it
    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expensedata = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };

        // now we also need pass it up further to the App
        props.onAddExpense(expensedata);
        setIsEditing(false);
    }

    const [isEditing, setIsEditing] = useState(false);
    // to open the form
    const startEditingHandler = () => {
        setIsEditing(true);
    }
    // this function will be called from the ExpenseForm component to cancel the form
    const stopEditingHandler = () => {
        setIsEditing(false);
    }

    return (
        <div className='new-expense'>
            {!isEditing && <button onClick={startEditingHandler}>Add New Expense</button>}
            {isEditing && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={stopEditingHandler} />}
        </div>
    );
}

export default NewExpense;