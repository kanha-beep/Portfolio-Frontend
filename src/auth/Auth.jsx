import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Auth({ setIsLogin , setIsAuth, isAuth}) {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const url = isAuth ? "login" : "register";
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAuth) {
        console.log("login starts");
        const res = await api.post(`/auth/${url}`, formData);
        console.log("login done");
        localStorage.setItem("token", res.data.token);
        setIsLogin(res.data.token);
        setIsAuth(true)
      } else {
        const res = await api.post(`/auth/${url}`, formData);
        localStorage.setItem("token", res.data.token);
        setIsLogin(res.data.token);
      }
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-3">{isAuth ? "Login" : "Sign Up"}</h2>

      <div className="text-center mb-3">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setIsAuth(true)}
        >
          Login
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => setIsAuth(false)}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isAuth && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="form-control mb-2"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <button className="btn btn-primary w-100 mt-2" type="submit">
          {isAuth ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
