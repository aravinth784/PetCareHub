import { useState } from "react";

export default function AdoptionForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    breed: "",
    description: "",
    image: "",
    postedBy: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", age: "", breed: "", description: "", image: "", postedBy: "" });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input className="input input-bordered w-full" name="name" placeholder="Pet Name" onChange={handleChange} value={form.name} />
      <input className="input input-bordered w-full" name="age" placeholder="Pet Age" onChange={handleChange} value={form.age} />
      <input className="input input-bordered w-full" name="breed" placeholder="Breed" onChange={handleChange} value={form.breed} />
      <input className="input input-bordered w-full" name="image" placeholder="Image URL" onChange={handleChange} value={form.image} />
      <textarea className="textarea textarea-bordered w-full" name="description" placeholder="Short Description" onChange={handleChange} value={form.description}></textarea>
      <input className="input input-bordered w-full" name="postedBy" placeholder="Your Email" onChange={handleChange} value={form.postedBy} />
      <button className="btn btn-primary w-full">Submit</button>
    </form>
  );
}
