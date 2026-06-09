import { useState, useRef, useEffect } from "react";

function ExpenseForm({ addExpense, editingExpense, updateExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [editingExpense]);

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title || "");
      setAmount(editingExpense.amount || "");
      setCategory(editingExpense.category || "Food");
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount) return;

    if (editingExpense) {
      updateExpense({
        ...editingExpense,
        title,
        amount: Number(amount),
        category
      });
    } else {
      addExpense({
        title,
        amount: Number(amount),
        category
      });
    }

    setTitle("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="category-buttons">
        <button type="button" className={category === "Food" ? "active" : ""} onClick={() => setCategory("Food")}>Food</button>
        <button type="button" className={category === "Travel" ? "active" : ""} onClick={() => setCategory("Travel")}>Travel</button>
        <button type="button" className={category === "Shopping" ? "active" : ""} onClick={() => setCategory("Shopping")}>Shopping</button>
        <button type="button" className={category === "Entertainment" ? "active" : ""} onClick={() => setCategory("Entertainment")}>Entertainment</button>
      </div>

      <button type="submit">
        {editingExpense ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default ExpenseForm;