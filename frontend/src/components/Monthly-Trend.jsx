import React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import './Monthly-Trend.css'

const MonthlyTrend = ({ transactions }) => {

  const expenseTrack = transactions.filter((item) =>
    item.type === "expense").reduce((acc, item) => {
      const month = new Date(item.date).getMonth();
      acc[month] = (acc[month] || 0) + Number(item.amount)
      return acc;
    }, {});

  const incomeTrack = transactions.filter((item) =>
    item.type === "income").reduce((acc, item) => {
      const month = new Date(item.date).getMonth();
      acc[month] = (acc[month] || 0) + Number(item.amount)
      return acc;
    }, {});

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const chartData = months.map((month, index) => ({
    month,
    income: incomeTrack[index] || 0,
    expense: expenseTrack[index] || 0,
  }));

  return (
    <div className='MonthlyTrend'>
      <h1>Monthly-Trend</h1>
      <div className="chart">

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <CartesianGrid stroke="#1F2937" strokeDasharray="4 4" />
            <XAxis dataKey="month" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />

            <Tooltip />
            <Legend />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#22C55E"
              fill="#22C55E33"
              strokeWidth={3}
            />

            <Area
              type="monotone"
              dataKey="expense"
              stroke="#EF4444"
              fill="#EF444433"
              strokeWidth={3}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

  )
}

export default MonthlyTrend
