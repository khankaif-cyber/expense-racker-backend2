<<<<<<< HEAD
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const User = require("./models/User");

const Expense = mongoose.model("Expense", new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
}));

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// Get expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).send(`Error fetching expenses: ${err.message}`);
  }
});

// Add expense
app.post("/api/expenses", async (req, res) => {
  try {
    const { title, amount } = req.body;
    if (!title || !amount) return res.status(400).send("Title and amount required");
    const expense = new Expense({ title, amount });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).send(`Error adding expense: ${err.message}`);
  }
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send("Username and password required");

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.redirect("/login.html");
  } catch (err) {
    res.status(500).send(`Error signing up: ${err.message}`);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send("Username and password required");

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return  res.status(400).json({ success: false, message: "Invalid password" });


    res.json({ success: true, message: "Login successful" });

  } catch (err) {
    res.status(500).send(`Login error: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
=======
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const User = require("./models/User");

const Expense = mongoose.model("Expense", new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
}));

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// Get expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).send(`Error fetching expenses: ${err.message}`);
  }
});

// Add expense
app.post("/api/expenses", async (req, res) => {
  try {
    const { title, amount } = req.body;
    if (!title || !amount) return res.status(400).send("Title and amount required");
    const expense = new Expense({ title, amount });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).send(`Error adding expense: ${err.message}`);
  }
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send("Username and password required");

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.redirect("/login.html");
  } catch (err) {
    res.status(500).send(`Error signing up: ${err.message}`);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send("Username and password required");

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return  res.status(400).json({ success: false, message: "Invalid password" });


    res.json({ success: true, message: "Login successful" });

  } catch (err) {
    res.status(500).send(`Login error: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
>>>>>>> 21b006baa0f735c2447096e0ccabf2cd6d8b7501
