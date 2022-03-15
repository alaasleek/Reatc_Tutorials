import React, {useState, useRef} from "react";

import Card from '../UI/Card';
import classes from './AddUser.module.css'
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const  AddUser = props => {

    // using ref we can get user input after the user finishes typing and submited 
    // no need to user the onChange for the input form
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    // we can use state to get user input, but in this case the state will be updated every time the user type new letter
    //const [enteredUsername, setEnteredUsername] = useState('');
    //const [enteredAge, setEnteredAge] = useState('');
    //const usernameChangeHanbeler = event => {
        //setEnteredUsername(event.target.value);
    //};
    //const ageChangeHanbeler = event => {
        //setEnteredAge(event.target.value);
    //};

    const [error, setError] = useState(null);
    const errorHadler = () => {
        setError(null);
    };

    const addUserHandler = (event) => {
        event.preventDefault();

        const enteredUsername = nameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;

        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input', 
                message: 'Please enter a valid name and age (non-empty values)'
            });
            console.log("invalid");
            return;
        }
        if(+enteredAge < 1) {
            setError({
                title: 'Invalid input', 
                message: 'Please enter a valid age (> 0)'
            });
            console.log("invalid");
            return;
        }

        //console.log(enteredUsername, enteredAge);
        props.onAddUser(enteredUsername, enteredAge);

        //setEnteredUsername('');
        //setEnteredAge('');
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    };

    return (
        <React.Fragment>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHadler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id='uesername' type='text' ref={nameInputRef}/>

                    <label htmlFor='age'>Age(year)</label>
                    <input id='age' type='number'  ref={ageInputRef}/>

                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </React.Fragment>
    );

};

export default AddUser;