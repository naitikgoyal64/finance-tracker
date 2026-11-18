import React from 'react'
import { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import './Overview.css'
import { IoPrint } from 'react-icons/io5';

const Overview = ({ transactions, categoryColors }) => {

  const [selectedTime, setSelectedTime] = useState("This Month")

  const filteredTransactions = transactions.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();

    if (selectedTime === "This Month") {
      return (date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }

    if (selectedTime === "Previous Month") {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
      return (date.getMonth() === lastMonth.getMonth &&
        date.getFullYear() === lastMonth.getFullYear()
      );
    }

    if (selectedTime === "Last 3 Months") {
      const lastThreeMonths = new Date(now.getFullYear(), now.getMonth() - 2);

      return date >= lastThreeMonths && date <= now;
    }

    if (selectedTime === "This Year") {
      return date.getFullYear() === now.getFullYear();
    }

    return true;
  });

  const Expensecategory = filteredTransactions.reduce((acc, item) => {
    if (item.type === "expense") {
      acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    }
    return acc;
  }, {});

  const totalExpense = filteredTransactions.filter((item) =>
    item.type === "expense").reduce((sum, item) => sum + Number(item.amount), 0);

  const expenseCount = filteredTransactions.filter(
    item => item.type === "expense"
  ).length;

  const highestExpense = filteredTransactions.filter(
    item => item.type === "expense").sort((a, b) => Number(b.amount) - Number(a.amount))[0];

  const chartData = Object.entries(Expensecategory).map(([category, amount]) => ({
    category,
    amount
  }));

  return (
    <div className='Overview'>
      <div className="Overview-Heading">
        <h1>Overview</h1>
        <select value={selectedTime} name="time" id="time" onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="This Month">This Month</option>
          <option value="Previous Month">Previous Month</option>
          <option value="Last 3 Months">Last 3 Months</option>
          <option value="This year">This Year</option>
        </select>
      </div>

      <div className="Overview-Content">
        <div className="chart-container">
          <div className="chart">
            <PieChart width={400} height={350}>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                innerRadius={65}
                outerRadius={130}
                label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.category}
                    fill={categoryColors[entry.category]}
                  />
                ))}
              </Pie>

              <Tooltip
                position={{ x: 250, y: 40 }}
              />
            </PieChart>

            <div className="chart-center">
              <p>TOTAL</p>
              <p>EXPENSES</p>
              <h2>₹{totalExpense}</h2>
            </div>
          </div>

          <div className="summary">

            {Object.entries(Expensecategory).length === 0 ? (
                    <div className="empty-transactions">
                        <div className="empty-icon">💸</div>
                        <h3>No expenses yet</h3>
                        <p>Add expenses to see the chart.</p>
                    </div>
                ) : Object.entries(Expensecategory).map(([category, amount]) => (
              <div key={category} className="summary-item">
                <span
                  className="color-dot"
                  style={{ backgroundColor: categoryColors[category] }}
                ></span>
                <span>{category}:</span>
                <span>₹{amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Overview-Footer">
        <div className="footer-card">
          <div className="expense">
            <span>Biggest Expense : </span>
            <span>₹{highestExpense?.amount}</span>
          </div>

          <div className="details-container">
            <div className="details">
              <p>DETAILS:- </p>
              <p>{highestExpense?.title.toUpperCase()}</p>
            </div>
            <div className="detail-date">
              <p>🗓️{highestExpense?.date}</p>
            </div>
          </div>
        </div>

        <div className="footer-card">
          <span>Number of Transactions on expense : </span>
          <span>{expenseCount}</span>
        </div>

      </div>
    </div>
  )
};

export default Overview
