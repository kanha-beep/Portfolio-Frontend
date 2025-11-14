import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ isLogin }) {
  console.log("value: ", isLogin);
  return (
    <nav style={{ background: "#222" }} className="p-1 text-white">
      {isLogin ? (
        <>
          <Link to="/" style={{ margin: "0 1rem", color: "#fff" }}>
            Home
          </Link>
          <Link to="/about" style={{ margin: "0 1rem", color: "#fff" }}>
            About
          </Link>
          <Link to="/projects" style={{ margin: "0 1rem", color: "#fff" }}>
            Projects
          </Link>
          <Link to="/blogs" style={{ margin: "0 1rem", color: "#fff" }}>
            Blog
          </Link>
          <Link to="/contacts" style={{ margin: "0 1rem", color: "#fff" }}>
            Contact
          </Link>
          <Link to="/cms" style={{ margin: "0 1rem", color: "#fff" }}>
            CMS
          </Link>
          <Link to="/logout" style={{ margin: "0 1rem", color: "#fff" }}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/auth" style={{ margin: "0 1rem", color: "#fff" }}>
            Register
          </Link>
          <Link to="/auth" style={{ margin: "0 1rem", color: "#fff" }}>
            Login
          </Link>
        </>
      )}
    </nav>
  );
}