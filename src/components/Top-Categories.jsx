import React from 'react'
import './Top-Categories.css'

const TopCategories = ({ Expensecategory, totalExpense, categoryColors }) => {

  const sortedCategories = Object.entries(Expensecategory).sort((a, b) =>
    Number(b[1]) - Number(a[1]))
    .slice(0, 6);

  const categoryPercentage = sortedCategories.map(([category, amount]) => {
    const percentage = ((amount / totalExpense) * 100).toFixed(1);
    return { category, amount, percentage };
  });


  return (
    <div className='TopCategories'>
      <h1>Top-Categories</h1>

      <div className="Category-list">
        {categoryPercentage.length === 0 ? (
          <div className="empty-transactions">
            <div className="empty-icon">💸</div>
            <h3>No expenses yet</h3>
            <p>Add expenses to proceed.</p>
          </div>
        ) : categoryPercentage.map((item) => (
          <div key={item.category} className="category-item">
            <div className="category-info">
              <span>{item.category}</span>
              <span>{item.percentage}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: categoryColors[item.category]
                }}
              ></div>
            </div>

            <p>${item.amount}</p>

          </div>

        ))}
      </div>

    </div>
  )
}

export default TopCategories
