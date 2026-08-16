import { useState, useEffect, useRef } from 'react'
import { FiTrendingUp, FiTrendingDown, FiCreditCard } from "react-icons/fi";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card from './components/Card'
import SideBar from './components/SideBar'
import Navbar from './components/navbar'
import AddTransaction from './components/Add-transaction'
import Overview from './components/Overview'
import RecentTransactions from './components/Recent-Transactions'
import MonthlyTrend from './components/Monthly-Trend'
import TopCategories from './components/Top-Categories'

function App() {

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);


  const [editingTransaction, setEditingTransaction] = useState(null);
  const updateTransactionRef = useRef(null);

  const saveTransaction = (transaction) => {
    if (editingTransaction) {
      setTransactions(
        transactions.map((item) =>
          item.id === transaction.id ? transaction : item
        )
      );
    } else {
      setTransactions([...transactions, transaction]);
    }

    setEditingTransaction(null);
  };

  const income = transactions
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const expense = transactions
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const now = new Date();

  const monthlyIncome = transactions
    .filter((item) =>
    (item.type === "income" &&
      new Date(item.date).getMonth() === now.getMonth() &&
      new Date(item.date).getFullYear() === now.getFullYear()))
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const monthlyExpense = transactions
    .filter((item) =>
    (item.type === "expense" &&
      new Date(item.date).getMonth() === now.getMonth() &&
      new Date(item.date).getFullYear() === now.getFullYear()))
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const balance = monthlyIncome - monthlyExpense;

  const Expensecategory = transactions.reduce((acc, item) => {
    if (item.type === "expense") {
      acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    }
    return acc;
  }, {});

  const totalExpense = transactions.filter((item) =>
    item.type === "expense").reduce((sum, item) => sum + Number(item.amount), 0);

  const categoryColors = {
    Salary: "#22C55E",
    "Food & Dining": "#F59E0B",
    Shopping: "#3B82F6",
    Transportation: "#8B5CF6",
    "Health & Fitness": "#10B981",
    Entertainment: "#EC4899",
    Education: "#06B6D4",
    Other: "#94A3B8"
  };

  const overviewRef = useRef(null);
  const transactionRef = useRef(null);
  const reportRef = useRef(null);
  const categoryRef = useRef(null);
  const [showAddTransaction, setShowAddTransaction] = useState(false)


  return (
    <div>
      <div className="App flex">
        <SideBar
          overviewRef={overviewRef}
          transactionRef={transactionRef}
          categoryRef={categoryRef}
          reportRef={reportRef}
        />

        <div className="Main-Content">
          <Navbar title="Finance Tracker" name="John Doe" />

          <div className="Balance-Overview">
            <Card title="Total Balance" balance={balance} message = {"Remaining balance of this month"} icon={<FiCreditCard />} />
            <Card title="Total Income" balance={monthlyIncome} message = {"Money earned this month"} icon={<FiTrendingUp />} />
            <Card title="Total Expenses" balance={monthlyExpense} message = {"Expenses this month so far"}icon={<FiTrendingDown />} />
          </div>

          <div ref={transactionRef}>
            <div className="transaction-stat">
              <MonthlyTrend transactions={transactions} />
              <RecentTransactions transactions={transactions} setTransactions={setTransactions} setEditingTransaction={setEditingTransaction} onAdd={() => setShowAddTransaction(true)} />
            </div>
          </div>

          <div ref={overviewRef}>
            <div className="Transaction-report">
              <Overview transactions={transactions} categoryColors = {categoryColors} />
              <TopCategories Expensecategory={Expensecategory}
                totalExpense={totalExpense}
                categoryColors={categoryColors} />
            </div>
          </div>
          {showAddTransaction && (
            <div className="modal-overlay">
              <div className="transaction-modal">
                <AddTransaction
                  addTransaction={saveTransaction}
                  editingTransaction={editingTransaction}
                  setEditingTransaction={setEditingTransaction}
                  onClose={() => { setShowAddTransaction(false); setEditingTransaction(null); }}
                />
              </div>
            </div>
          )}
        </div>

      </div>

    </div>

  )
}

export default App
