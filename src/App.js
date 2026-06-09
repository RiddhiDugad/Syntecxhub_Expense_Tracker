import "./App.css";
import { useState, useMemo, useCallback, useEffect } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (user?.username) {
      const saved = localStorage.getItem(`expenses_${user.username}`);
      setExpenses(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  useEffect(() => {
    if (user?.username) {
      localStorage.setItem(
        `expenses_${user.username}`,
        JSON.stringify(expenses)
      );
    }
  }, [expenses, user]);

  const addExpense = useCallback((expense) => {
    setExpenses((p) => [...p, { ...expense, id: Date.now() }]);
  }, []);

  const deleteExpense = useCallback((id) => {
    setExpenses((p) => p.filter((i) => i.id !== id));
  }, []);

  const editExpense = useCallback((item) => {
    setEditingExpense(item);
  }, []);

  const updateExpense = useCallback((item) => {
    setExpenses((p) =>
      p.map((i) => (i.id === item.id ? item : i))
    );
    setEditingExpense(null);
  }, []);

  const total = useMemo(() => {
    return expenses.reduce((s, i) => s + Number(i.amount || 0), 0);
  }, [expenses]);

  const filteredExpenses = expenses
    .filter((i) =>
      i.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((i) =>
      filter === "All" ? true : i.category === filter
    );

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={(u) => {
          setUser(u);
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <button
        onClick={() => {
          setIsLoggedIn(false);
          setUser(null);
          setExpenses([]);
          setSearch("");
          setFilter("All");
          setEditingExpense(null);
        }}
      >
        Logout
      </button>

      <h2>Total: ₹{total}</h2>

      <input
        className="search"
        placeholder="Search expenses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Food")}>Food</button>
        <button onClick={() => setFilter("Travel")}>Travel</button>
        <button onClick={() => setFilter("Shopping")}>Shopping</button>
      </div>

      <ExpenseForm
        addExpense={addExpense}
        editingExpense={editingExpense}
        updateExpense={updateExpense}
      />

      <ExpenseList
        expenses={filteredExpenses}
        deleteExpense={deleteExpense}
        editExpense={editExpense}
      />
    </div>
  );
}

export default App;