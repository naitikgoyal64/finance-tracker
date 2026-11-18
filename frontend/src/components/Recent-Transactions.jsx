import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './Recent-Transactions.css'

const RecentTransactions = ({ transactions, setTransactions, setEditingTransaction, onAdd }) => {

    const [openMenu, setOpenMenu] = useState(null);
    const [search, setSearch] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [openFilter, setOpenFilter] = useState(null);
    const [filter, setFilter] = useState({
        title: "",
        amount: "",
        date: "",
        type: "",
        category: ""

    });
    const filterRef = useRef(null);
    const menuRef = useRef(null);
    const AddTransactionref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilter(false);
            }

            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowFilter(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleDelete = (id) => {
        const updatedTransactions = transactions.filter((item) => item.id !== id);
        setTransactions(updatedTransactions);
    }

    const filteredTransactions = transactions.filter((item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase()) ||
        item.amount?.toLowerCase().includes(search.toLowerCase()) ||
        item.date?.toLowerCase().includes(search.toLowerCase()) ||
        item.type?.toLowerCase().includes(search.toLowerCase())
    );

    let finalTransactions = [...filteredTransactions].sort((a, b) => {
        const dateDifference = new Date(b.date) - new Date(a.date);

        if (dateDifference !== 0) {
            return dateDifference;
        }

        return b.id - a.id;
    });


    if (filter.category) {
        finalTransactions = finalTransactions.filter(
            (item) => item.category === filter.category
        );
    }

    if (filter.type) {
        finalTransactions = finalTransactions.filter(
            (item) => item.type === filter.type
        );
    }

    if (filter.amount === "Highest") {
        finalTransactions = [...finalTransactions].sort((a, b) => b.amount - a.amount);
    }

    if (filter.amount === "Lowest") {
        finalTransactions = [...finalTransactions].sort((a, b) => a.amount - b.amount);
    }

    if (filter.date === "Newest") {
        finalTransactions = [...finalTransactions].sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    if (filter.date === "Oldest") {
        finalTransactions = [...finalTransactions].sort((a, b) => new Date(a.date) - new Date(b.date))
    }

    const [visibleCount, setVisibleCount] = useState(7);
    const visibleTransactions = finalTransactions.slice(0, visibleCount);

    return (
        <div className='RecentTransactions'>
            <div className="RecentTransactions-Header">
                <div className="RecentTransactions-Title">
                    <h1>Recent Transactions</h1>
                </div>
                <div className="Search">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='🔍Search for the transactions' />
                </div>
                <div className="Addbtn">
                    <button onClick={onAdd}>Add</button>
                </div>
            </div>


            <div className="menu">
                <button onClick={() => setShowFilter(!showFilter)}>Filter</button>
                <button className="clear-filter" onClick={() => { setFilter({ amount: "", date: "", type: "", category: "" }); setSearch(""); }}>Clear All</button>

                {showFilter && (
                    <div className="filter-menu" ref={filterRef}>
                        <>
                            <div className="filter-item" >
                                <p className="sub-menu" onClick={() => setOpenFilter(openFilter === "amount" ? null : "amount")}>Amount &gt;</p>
                                {openFilter === "amount" && (
                                    <div className="sub-item">
                                        <p onClick={() => { setFilter({ ...filter, amount: "Highest" }); setOpenFilter(null); setShowFilter(false); }}>Highest to lowest</p>
                                        <p onClick={() => { setFilter({ ...filter, amount: "Lowest" }); setOpenFilter(null); setShowFilter(false); }}>Lowest to Highest</p>
                                    </div>
                                )}
                            </div>

                            <div className="filter-item">
                                <p className="sub-menu" onClick={() => setOpenFilter(openFilter === "category" ? null : "category")}>Category &gt;</p>
                                {openFilter === "category" && (
                                    <div className="sub-item">
                                        <p onClick={() => { setFilter({ ...filter, category: "Salary" }); setOpenFilter(null); setShowFilter(false); }}>Salary</p>
                                        <p onClick={() => { setFilter({ ...filter, category: "Food & Dining" }); setOpenFilter(null); setShowFilter(false); }}>Food & Dining</p>
                                        <p onClick={() => { setFilter({ ...filter, category: "Shopping" }); setOpenFilter(null); setShowFilter(false); }}>Shopping</p>
                                        <p onClick={() => { setFilter({ ...filter, category: "Transportation" }); setOpenFilter(null); setShowFilter(false); }}>Transportation</p>
                                        <p onClick={() => { setFilter({ ...filter, category: "Health & Fitness" }); setOpenFilter(null); setShowFilter(false); }}>Health & Fitness</p>
                                        <p onClick={() => { setFilter({ ...filter, category: "Entertainment" }); setOpenFilter(null); setShowFilter(false); }}>Entertainment</p>
                                        <p onClick={() => { setFilter({ ...filter, category: "Education" }); setOpenFilter(null); setShowFilter(false); }}>Education</p>
                                        <p onClick={() => { setFilter({ ...filter, category: "Other" }); setOpenFilter(null); setShowFilter(false); }}>Other</p>
                                    </div>
                                )}
                            </div>

                            <div className="filter-item">
                                <p className="sub-menu" onClick={() => setOpenFilter(openFilter === "time" ? null : "time")}>Time &gt;</p>
                                {openFilter === "time" && (
                                    <div className="sub-item">
                                        <p onClick={() => { setFilter({ ...filter, date: "Oldest" }); setOpenFilter(null); setShowFilter(false); }}>oldest</p>
                                        <p onClick={() => { setFilter({ ...filter, date: "Newest" }); setOpenFilter(null); setShowFilter(false); }}>newest</p>
                                    </div>

                                )}
                            </div>

                            <div className="filter-item">
                                <p className="sub-menu" onClick={() => setOpenFilter(openFilter === "type" ? null : "type")}> Type &gt;</p>
                                {openFilter === "type" && (
                                    <div className="sub-item">
                                        <p onClick={() => { setFilter({ ...filter, type: "income" }); setOpenFilter(null); setShowFilter(false); }}>income</p>
                                        <p onClick={() => { setFilter({ ...filter, type: "expense" }); setOpenFilter(null); setShowFilter(false); }}>expense</p>
                                    </div>
                                )}
                            </div>
                        </>
                    </div>
                )}
            </div>


            <div className="applied-filter">
                {Object.entries(filter).map(([key, value]) => {
                    if (value) {
                        return (
                            <span className="filter-tag">
                                {value} <button onClick={() => setFilter({ ...filter, [key]: "" })}>✕</button>
                            </span>
                        );
                    }
                    return null;
                })}
            </div>

            <div className="Transaction-Header">
                <p>Date</p>
                <p>Title</p>
                <p>Category</p>
                <p>Type</p>
                <p>Amount</p>
            </div>
            <div className="Transactions-List">
                {visibleTransactions.length === 0 ? (
                    <div className="empty-transactions">
                        <div className="empty-icon">💸</div>
                        <h3>No transactions yet</h3>
                        <p>Add a transaction to see it here.</p>
                    </div>
                ) : visibleTransactions.map((item) => (
                    <div className="Transaction" key={item.id}>
                        <p className='transaction-date'>
                            {new Date(item.date).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short"
                            })}
                        </p>
                        <p className='transaction-title'>{item.title.toUpperCase()}</p>
                        <p className={`transaction-category ${item.type === "income" ? "income-category" : "expense-category"}`}>{item.category}</p>
                        <p className={`transaction-type ${item.type === "income" ? "income-text" : "expense-text"}`}>
                            {item.type}
                        </p>
                        <p className={`transaction-amount ${item.type === "income" ? "income-text" : "expense-text"}`}>
                            {item.type === "income" ? "+" : "-"}₹{item.amount}
                        </p>
                        <div className="editdelete-Menu">
                            <button
                                className="editdelete-menubtn"
                                onClick={() =>
                                    setOpenMenu(openMenu === item.id ? null : item.id)
                                }
                            >
                                ⋮
                            </button>

                            {openMenu === item.id && (
                                <div className="menu-dropdown" ref={menuRef}>
                                    <button onClick={() => {
                                        setEditingTransaction(item); onAdd(); setOpenMenu(null); /*AddTransactionRef.current?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center"
                                        });*/
                                    }}>Edit</button>
                                    <button onClick={() => { handleDelete(item.id); setOpenMenu(null); }}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
                }
                {visibleCount < finalTransactions.length && (
                    <button className='Read-morebtn' onClick={() => setVisibleCount(visibleCount + 7)}>
                        Read More...
                    </button>
                )}
            </div>
        </div>
    )
}

export default RecentTransactions
