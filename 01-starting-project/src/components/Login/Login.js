import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// function for the useReducer Hook. it is ok to define it out side the component
// because it will take every thing it needs as arguments
const emailReduser = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')};
  }
  // state = the most recent state
  if(action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false};
};

const passwordReduser = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.trim().length > 6};
  }
  // state = the most recent state
  if(action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: '', isValid: false};
}

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  // instead of two states we will use 'useReducer' to manage only one start for email value and is valid
  const [emailState, dispatchEmail] = useReducer(emailReduser, {value: '', isValid: null});

  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [passwordState, dispatchPassword] = useReducer(passwordReduser, {value: '', isValid: null});

  const [formIsValid, setFormIsValid] = useState(false);

  

  // check valid email/psw only if enteredEmail, or enteredPassword have changed
  // without the timer the useEffect will run every time the user enter new letter; 
  // we want to run it when the user stop typing for 500 ms
  const {isValid: emailIsValid} = emailState;
  const {invalid: passwordIsValid} = passwordState; // destructure states to get validity alone
  useEffect(() => {
    const timerID = setTimeout(() => { 
      console.log('check email/psw');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    // return a CLEAN-UP function: this function will run before runing the useEffect, but not the first time 
    // as the user is typing we clear the last timer and set an new one. if the user stop for 500 ms => run 'setFormIsValid'
    return () => {
      console.log("Clear timer")
      clearTimeout(timerID);
    };
  }, [emailIsValid, passwordIsValid]); // run it only if validity changed, not 

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    //setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  // this is not a good way of setting emailIsValid. we should n't set a state based on other state
  // recat don't update state immediately so we might use the old value to update the other state
  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
