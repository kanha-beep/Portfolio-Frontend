// ✅ BlogView.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import EditProjectButton from "../components/buttons/EditProjectButton.jsx"
export default function SingleProjects() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { projectsId } = useParams(); // 🧠 get blog id from URL
  const [projects, setProjects] = useState(null);
  console.log("project id: ", projectsId);
  // 🧩 fetch single blog
  useEffect(() => {
    const getSingleProjects = async () => {
      try {
        const res = await api.get(`/projects/${projectsId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("single blog: ", res.data);
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err.response.data.message);
      }
    };
    getSingleProjects();
  }, [projectsId]);

  if (!projects)
    return <p className="text-center mt-10">Loading Projects...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 border shadow p-5 mt-5">
      <h1 className="text-3xl font-bold mb-3">{projects.title}</h1>
      <p className="text-gray-600 mb-4">
        Posted on: {new Date(projects.createdAt).toLocaleDateString()}
      </p>
      <p className="text-lg leading-relaxed">
        Description: <b>{projects.description}</b>
      </p>
      <EditProjectButton navigate={navigate} projectsId={projectsId}/>
    </div>
  );
}
