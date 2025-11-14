import React from "react";

export default function ViewProjectButton({navigate, p}) {
  return (
    <div>
      <button
        onClick={() => navigate(`/projects/${p._id}`)}
        className="btn btn-outline-primary ms-3"
      >
        View
      </button>
    </div>
  );
}
