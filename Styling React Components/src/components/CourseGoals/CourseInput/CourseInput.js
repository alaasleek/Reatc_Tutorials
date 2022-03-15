import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../UI/Button/Button';


// this is a sub components defined inside CourseInput because we only using it with it
const FormControl = styled.div`
  margin: 0.5rem 0;

  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    color: ${props => (props.invalid ? 'red' : 'black')};
  }

  & input {
    display: block;
    width: 100%;
    border: 1px solid ${props => (props.invalid ? 'red' : '#ccc')};
    background: ${props => (props.invalid ? '#ffd7d7' : 'transparant')};
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }

  & input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  }
`;

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    if(event.target.value.trim().length > 0) { // if the user entered valid string
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if(enteredValue.trim().length === 0) { // if the user entered empty string
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>

    {/* conditional styling */}
    <FormControl invalid={!isValid}>
      <label>Course Goal</label>
      <input type="text" onChange={goalInputChangeHandler} />
    </FormControl>


      {/* conditional styling WITHOUT using styled components
      if not valid we need to add the string "invalid" to "from cotrol" 
      <div className={`form-control ${!isValid ? 'invalid': ''}`}>              

        inline styling*
        <label style={{color: !isValid ? 'red' : 'black'}}>Course Goal</label>

        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      */}
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
