import React from "react";

export default function EditProjectButton({ navigate, projectsId }) {
  return (
    <div>
      <button
        onClick={() => navigate(`/projects/${projectsId}/edit`)}
        className="btn btn-outline-success ms-3"
      >
        Edit Project
      </button>
    </div>
  );
}
