function ExpenseList({ expenses, deleteExpense, editExpense }) {
  if (!expenses.length) {
    return <p style={{ textAlign: "center" }}>No expenses found</p>;
  }

  return (
    <ul>
      {expenses.map((item) => (
        <li key={item.id} className="expense-item">
          <div>
            <strong>{item.title}</strong>
            <div>
              ₹{item.amount} • {item.category}
            </div>
          </div>

          <div>
            <button onClick={() => editExpense(item)}>Edit</button>
            <button onClick={() => deleteExpense(item.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;