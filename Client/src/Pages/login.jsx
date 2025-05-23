import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      alert(res.data.message);
      navigate("/home"); 
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold">Login</h2>
          <input className="input input-bordered" placeholder="Email" name="email" onChange={handleChange} />
          <input type="password" className="input input-bordered" placeholder="Password" name="password" onChange={handleChange} />
          <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
}
