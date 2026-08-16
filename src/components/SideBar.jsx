import './SideBar.css'
import { FiHome, FiCreditCard, FiPieChart, FiBarChart2, FiTarget, FiSettings } from "react-icons/fi";


const Sidebar = ({ overviewRef, transactionRef, categoryRef, reportRef }) => {

    return (
        <div className="SideBar">
            <div className="container">


                <div className="heading">
                    <h1 className="SideBar-title">Finance Tracker</h1>
                </div>

                <div className="items">
                    <ul>
                        <li>
                            <span onClick={() =>
                                overviewRef.current.scrollIntoView({
                                    behavior: "smooth",
                                })

                            }>
                                <FiHome />
                                Overview</span>
                        </li>
                        <li>
                            <span onClick={() =>
                                transactionRef.current.scrollIntoView({
                                    behavior: "smooth",
                                })
                            }>
                                <FiCreditCard />
                                Transactions</span>
                        </li>
                        <li><span onClick={() =>
                            categoryRef.current.scrollIntoView({
                                behavior: "smooth",
                            })
                        }>
                            <FiPieChart />
                            Categories</span>
                        </li>
                        <li><span onClick={() =>
                            reportRef.current.scrollIntoView({
                                behavior: "smooth",
                            })
                        }>
                            <FiBarChart2 />
                            Reports</span>
                        </li>
                        <li>
                            <span>
                                <FiTarget />
                                Budgets</span>
                        </li>
                        <li>
                            <span>
                                <FiTarget />
                                Goals</span>
                        </li>

                    </ul>
                </div>
            </div>

            <div className="footer">
                <span>
                    <FiSettings />
                    Settings
                </span>
                <p className='Name'>John doe</p>
            </div>
        </div>
    )
}

export default Sidebar;