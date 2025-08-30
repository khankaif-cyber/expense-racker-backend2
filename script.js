let expenses = []; // Store expenses
let totalAmount = 0; // Track total

// DOM elements
const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const InfoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Backend API URL
const API_URL = "https://expense-racker-backend2-14.onrender.com/api/expenses";

// ✅ Load expenses from backend
async function loadExpenses() {
  try {
    const response = await fetch(API_URL);
    expenses = await response.json();
    renderTable();
  } catch (err) {
    console.error("Error fetching expenses:", err);
  }
}

// ✅ Render table
function renderTable() {
  expenseTableBody.innerHTML = "";
  totalAmount = 0;

  for (const expense of expenses) {
    if (expense.category === 'Income') {
      totalAmount += expense.amount;
    } else if (expense.category === 'Expense') {
      totalAmount -= expense.amount;
    }

    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const AmountCell = newRow.insertCell();
    const InfoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    AmountCell.textContent = expense.amount;
    InfoCell.textContent = expense.info;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteExpense(expense._id));
    deleteCell.appendChild(deleteBtn);
  }

  totalAmountCell.textContent = totalAmount;
}

// ✅ Add new expense
addBtn.addEventListener('click', async function () {
  const category = categorySelect.value;
  const info = InfoInput.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (!category) return alert('Please select a category');
  if (isNaN(amount) || amount <= 0) return alert('Please enter a valid amount');
  if (!info) return alert('Please enter info');
  if (!date) return alert('Please select a date');

  const newExpense = { category, amount, info, date };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense)
    });
    const savedExpense = await response.json();
    expenses.push(savedExpense);
    renderTable();
  } catch (err) {
    console.error("Error adding expense:", err);
  }
});

// ✅ Delete expense
async function deleteExpense(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    expenses = expenses.filter(e => e._id !== id);
    renderTable();
  } catch (err) {
    console.error("Error deleting expense:", err);
  }
}

// Load expenses on page load
document.addEventListener("DOMContentLoaded", loadExpenses);
