import React, { useState, useEffect } from 'react'
import './Add-trasaction.css'

const AddTransaction = ({ addTransaction, editingTransaction, setEditingTransaction, onClose }) => {

  useEffect(() => {
    if (editingTransaction) {
      setTransaction(editingTransaction);
    }
  }, [editingTransaction]);


  const [transaction, setTransaction] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    type: ''
  })

  const validateForm = () => {
    if (!transaction.title || !transaction.amount || !transaction.category || !transaction.date || !transaction.type) {
      return false;
    }
    return true;
  }

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true);
    if (!validateForm()) return;

    const newTransaction = editingTransaction ? transaction : { ...transaction, id: Date.now() };
    addTransaction(newTransaction);
    setEditingTransaction(null);
    setTransaction({
      title: '',
      amount: '',
      category: '',
      date: '',
      type: ''
    });
    setSubmitted(false);

    onClose();


  };

  return (
    <div className='AddTransaction'>

      <div className="AddTransaction-Header">
        <h1>Add Transaction</h1>
        <button
          className="modal-close"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          placeholder='Title (e.g. Salary, Food, Shopping)'
          value={transaction.title} className={submitted && !transaction.title ? "error" : ""}
          onChange={(e) => setTransaction({ ...transaction, title: e.target.value })}
        />
        {submitted && !transaction.title && (
          <div className="error-message">
            Title is required
          </div>
        )}
        <input
          type="number"
          placeholder='₹0.00'
          value={transaction.amount} className={submitted && !transaction.amount ? "error" : ""}
          onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
        />
        {submitted && !transaction.amount && (
          <div className="error-message">
            Amount is required
          </div>
        )}
        <select
          value={transaction.category} className={submitted && !transaction.category ? "error" : ""}
          onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option >Salary</option>
          <option >Food & Dining</option>
          <option >Shopping</option>
          <option >Transportation</option>
          <option >Health & Fitness</option>
          <option >Entertainment</option>
          <option >Education</option>
          <option >Other</option>
        </select>
        {submitted && !transaction.category && (
          <div className="error-message">
            Category is required
          </div>
        )}

        <input
          type="date"
          value={transaction.date} className={submitted && !transaction.date ? "error" : ""}
          onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
        />
        {submitted && !transaction.date && (
          <div className="error-message">
            Date is required
          </div>
        )}

        <div className={`type ${submitted && !transaction.type ? "error" : ""}`} >
          <div className="option">
            <input
              type="radio"
              id="income"
              name="type"
              value="income"
              checked={transaction.type === 'income'}
              onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
            />
            <label htmlFor="income" className={`type-btn ${submitted && !transaction.type ? "error" : ""}`}>Income</label>
          </div>

          <div className="option">
            <input
              type="radio"
              id="expense"
              name="type"
              value="expense"
              checked={transaction.type === 'expense'}
              onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
            />
            <label htmlFor="expense" className={`type-btn ${submitted && !transaction.type ? "error" : ""}`}>Expense</label>
          </div>
        </div>
        {submitted && !transaction.type && (
          <div className="error-message">
            Type is required
          </div>
        )}
        <button className="submitbtn" type="submit">
          {editingTransaction ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>

    </div>
  )
}

export default AddTransaction
