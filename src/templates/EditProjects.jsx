// ✅ BlogEdit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import UpdateProjectButton from "../components/buttons/UpdateProjectButton.jsx";
export default function EditPage() {
  const { projectsId } = useParams(); // 🧠 get blog id from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState({
    title: "",
    description: "",
    url_1: "",
    url_2: "",
  });
  // 🧩 fetch current blog details
  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await api.get(`/projects/${projectsId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err.response.data.message);
      }
    };
    getProjects();
  }, [projectsId, token]);
  const handleChange = (e) => {
    setProjects((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  // 🧠 handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/projects/${projectsId}/edit`, projects, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("new updated: ", res.data);
      navigate("/cms/projects"); // redirect after success
    } catch (err) {
      console.error("Error updating blog:", err.response.data.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-center">Edit Project</h2>
      <div className="row">
        <form
          onSubmit={handleUpdate}
          className="mx-auto col-12 col-md-7 col-lg-7"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={projects.title}
            onChange={handleChange}
            className="p-2 form-control"
            required
          />
          <br />
          <textarea
            placeholder="Description"
            name="description"
            value={projects.description}
            onChange={handleChange}
            className="p-2 form-control"
            required
          />
          <input
            placeholder="Url 1"
            name="url_1"
            value={projects.url_1}
            onChange={handleChange}
            className="p-2 form-control my-3"
            required
          />
          <input
            placeholder="Url_2"
            name="url_2"
            value={projects.url_2}
            onChange={handleChange}
            className="p-2 form-control"
            required
          />
          <br />
          <UpdateProjectButton />
        </form>
      </div>
    </div>
  );
}
