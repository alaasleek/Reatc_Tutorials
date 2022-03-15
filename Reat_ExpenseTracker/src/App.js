import React, {useState} from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

  // Array of expenses
  const DummyExpensesList = [
    {id: 'e1', title: 'Toilet Paper', amount: 94.12, date: new Date(2020, 7, 14)},
    {id: 'e2', title: 'TV', amount: 436.16, date: new Date(2021, 3, 13)},
    {id: 'e3', title: 'Car', amount: 4330.00, date: new Date(2022, 4, 10)},
    {id: 'e4', title: 'Food', amount: 326.03, date: new Date(2022, 6, 12)},
  ];

function App() {

  const[expensesList, setExpensesList] = useState(DummyExpensesList);
  const addExpensehandler = (expense) => {

    // add new expense to list and copy the old ones
    // setExpensesList([expense, ...expensesList]); // this will work but not good, better to use functions

    // using function: the prevExpense will be passed automatically to the funstion
    setExpensesList((prevExpense) => {return [expense, ...prevExpense]});
  }

  return (
    <div>
      <NewExpense onAddExpense={addExpensehandler}/>
      <Expenses expenses={expensesList}/>
    </div>
  );
}

export default App;
