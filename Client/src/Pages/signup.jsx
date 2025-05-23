import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", username: "", contact: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/signup", form);
      alert(res.data.message);
      navigate("/login"); // Redirect to login after signup
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 shadow-xl bg-base-100">
        <div className="card-body space-y-4">
          <h2 className="text-2xl font-bold">Sign Up</h2>
          
          <input
            className="input input-bordered"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          
          <input
            className="input input-bordered"
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          
          <input
            className="input input-bordered"
            placeholder="Contact Number"
            name="contact"
            type="tel"
            value={form.contact}
            onChange={handleChange}
          />
          
          <input
            type="password"
            className="input input-bordered"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          
          <button className="btn btn-primary" onClick={handleSubmit}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}
