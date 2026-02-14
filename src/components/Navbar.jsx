import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../api";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  console.log("value: ", isLoggedIn);
  const handleLogout = async () => {
    try {
      const res = await api.post("/auth/logout");
      console.log("logged out: ", res?.data);
      setIsLoggedIn(false);
      navigate("/");
    } catch (e) {
      console.log("error logout: ", e?.response?.data);
    }
  };
  return (
    <nav style={{ background: "#222" }} className="text-center p-3 text-white">
      <NavLink
        to="/"
        end
        className="text-decoration-none"
        style={({ isActive }) => ({
          margin: "0 1rem",
          color: "#fff",
          borderBottom: isActive ? "3px solid #fff" : "3px solid transparent",
          paddingBottom: "4px",
        })}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className="text-decoration-none"
        style={({ isActive }) => ({
          margin: "0 1rem",
          color: "#fff",
          borderBottom: isActive ? "3px solid #fff" : "3px solid transparent",
          paddingBottom: "4px",
        })}
      >
        About
      </NavLink>
      <NavLink
        to="/projects"
        className="text-decoration-none"
        style={({ isActive }) => ({
          margin: "0 1rem",
          color: "#fff",
          borderBottom: isActive ? "3px solid #fff" : "3px solid transparent",
          paddingBottom: "4px",
        })}
      >
        Projects
      </NavLink>
      <NavLink
        to="/blogs"
        className="text-decoration-none"
        style={({ isActive }) => ({
          margin: "0 1rem",
          color: "#fff",
          borderBottom: isActive ? "3px solid #fff" : "3px solid transparent",
          paddingBottom: "4px",
        })}
      >
        Blog
      </NavLink>
      <NavLink
        to="/contacts"
        className="text-decoration-none"
        style={({ isActive }) => ({
          margin: "0 1rem",
          color: "#fff",
          borderBottom: isActive ? "3px solid #fff" : "3px solid transparent",
          paddingBottom: "4px",
        })}
      >
        Contact
      </NavLink>
      <NavLink
        to="/cms"
        className="text-decoration-none"
        style={({ isActive }) => ({
          margin: "0 1rem",
          color: "#fff",
          borderBottom: isActive ? "3px solid #fff" : "3px solid transparent",
          paddingBottom: "4px",
        })}
      >
        CMS
      </NavLink>
      {isLoggedIn ? (
        <NavLink
          onClick={handleLogout}
          className="text-decoration-none"
          style={({ isActive }) => ({
            margin: "0 1rem",
            color: "#fff",
            borderBottom: isActive ? "3px solid #fff" : "3px solid transparent",
            paddingBottom: "4px",
          })}
        >
          Logout
        </NavLink>
      ) : null}
    </nav>
  );
}
