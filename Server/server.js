const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://aravinthvsn:ara123vinth@petapp.eo7fs0y.mongodb.net/petcarehub')
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);


app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});


app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});


const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  vaccineDate: Date,
  image: String,
  medicalHistory: [String],
});

const Pet = mongoose.model("Pet", petSchema);


app.get("/api/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post("/api/pets", async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    const savedPet = await newPet.save();
    res.status(201).json(savedPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const adoptionSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  image: String,
  description: String, 
  postedBy: String,     
});

const AdoptionPet = mongoose.model("AdoptionPet", adoptionSchema);


app.get("/api/adoption", async (req, res) => {
  try {
    const pets = await AdoptionPet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post("/api/adoption", async (req, res) => {
  try {
    const newPet = new AdoptionPet(req.body);
    const savedPet = await newPet.save();
    res.status(201).json(savedPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
