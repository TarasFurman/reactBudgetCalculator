import React, { useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenceForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4';

const initialExpences = [
  { id: uuid(), charge: 'rent', amount: 1600 },
  { id: uuid(), charge: 'car payment', amount: 400 },
  { id: uuid(), charge: 'credit card bill', amount: 1200 },
  { id: uuid(), charge: 'new', amount: 1 }
];

const App = () => {
  // **********  state values  ************
  // all expenses, add expence
  const [expenses, setExpenses] = useState(initialExpences);
  // single expence
  const [charge, setCharge] = useState('');
  // single amount
  const [amount, setAmount] = useState('');
  // ********  functionality  ************
  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(charge,amount);
  };

  return (
    <>
      <Alert />
      <h1>budget calculator</h1>
      <main className='App'>
        <ExpenceForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Total spending :{' '}
        <span className='total'>
          $
          {expenses.reduce((acc, curr) => {
            return (acc += curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
};

export default App;
