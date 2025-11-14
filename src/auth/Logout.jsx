import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout({setIsLogin}) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      console.log("token removed");
      setIsLogin(false)
      navigate("/auth");
    }
  }, [navigate]);
  return null;
}
