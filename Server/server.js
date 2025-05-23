const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://aravinthvsn:ara123vinth@petapp.eo7fs0y.mongodb.net/petcarehub')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// -------------------------
// User Schema and Auth Routes
// -------------------------
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Signup
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// -------------------------
// Pet Adoption Schema and Routes
// -------------------------
const adoptionSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: String,
  description: String,
  image: String,
  postedBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Adoption = mongoose.model("Adoption", adoptionSchema);

// POST - Add pet
app.post("/api/adoption/post", async (req, res) => {
  try {
    const pet = new Adoption(req.body);
    await pet.save();
    res.json({ message: "Pet posted for adoption!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to post pet." });
  }
});

// GET - Fetch all pets
app.get("/api/adoption/all", async (req, res) => {
  try {
    const pets = await Adoption.find().sort({ createdAt: -1 });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to load pets." });
  }
});

// -------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
