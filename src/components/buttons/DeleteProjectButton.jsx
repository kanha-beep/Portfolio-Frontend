import React from "react";
import api from "../../api";

export default function DeleteProjectButton({ projects, token, p,setProjects }) {
  const handleDelete = async (id) => {
    await api.delete(`/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(projects.filter((p) => p._id !== id));
  };
  return (
    <div>
      <button
        onClick={() => handleDelete(p._id)}
        className="btn btn-outline-danger"
      >
        Delete
      </button>
    </div>
  );
}
