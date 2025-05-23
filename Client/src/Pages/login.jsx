import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); 
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        // Login request
        const res = await axios.post("http://localhost:5000/api/login", {
          email: form.email,
          password: form.password,
        });
        alert(res.data.message);
        navigate("/home");
      } else {
        // Signup request
        if (!form.name) {
          alert("Please enter your name");
          return;
        }
        const res = await axios.post("http://localhost:5000/api/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        alert(res.data.message);
        setIsLogin(true); // switch to login after signup
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

        {!isLogin && (
          <input
            type="text"
            className="input input-bordered mb-3"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          className="input input-bordered mb-3"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="input input-bordered mb-3"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-blue-500 underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setForm({ name: "", email: "", password: "" });
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
