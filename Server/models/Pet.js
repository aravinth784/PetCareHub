import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  vaccineDate: { type: Date, required: true },
  image: { type: String, required: true },
  medicalHistory: [String],
}, { timestamps: true });

export default mongoose.model("Pet", petSchema);
