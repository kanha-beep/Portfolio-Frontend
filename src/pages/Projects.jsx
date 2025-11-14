import { useEffect, useState } from "react";
import api from "../api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");
  const getAllProjects = async () => {
    const res = await api.get("/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("get projects to show", res.data);
    setProjects(res.data);
  };
  useEffect(() => {
    getAllProjects();
  }, [token]);
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>My Projects</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        {projects.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              width: "250px",
            }}
          >
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
