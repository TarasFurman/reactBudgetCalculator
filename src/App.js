import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenceForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4';

// const initialExpences = [
//   { id: uuid(), charge: 'rent', amount: 1600 },
//   { id: uuid(), charge: 'car payment', amount: 400 },
//   { id: uuid(), charge: 'credit card bill', amount: 1200 },
//   { id: uuid(), charge: 'new', amount: 1 }
// ];

const initialExpences = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];

const App = () => {
  // **********  state values  ************
  // all expenses, add expence
  const [expenses, setExpenses] = useState(initialExpences);
  // single expence
  const [charge, setCharge] = useState('');
  // single amount
  const [amount, setAmount] = useState('');
  // alert
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);

  useEffect(() => {
    console.log('we call useEffect')
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])
  // ********  functionality  ************
  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id
            ? { ...item, charge: charge, amount: amount }
            : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: 'item edited' });
      } else {
        const singleExpense = { id: uuid(), charge: charge, amount: amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: 'success', text: 'item added' });
      }

      setCharge('');
      setAmount('');
    } else {
      handleAlert({
        type: 'danger',
        text: `charge can't be empty value and amount value has to bebigger than zero`
      });
    }
  };
  // clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: 'all items deleted' });
  };

  // handle delete
  const handleDelete = id => {
    let tempexpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempexpenses);
    handleAlert({ type: 'danger', text: 'item deleted' });
  };

  // handle edit
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className='App'>
        <ExpenceForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        Total spending :{' '}
        <span className='total'>
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
};

export default App;
