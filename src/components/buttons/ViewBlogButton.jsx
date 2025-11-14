import React from "react";

export default function ViewBlogButton({ navigate, p }) {
  return (
    <div>
      <button
        onClick={() => navigate(`/blogs/${p._id}`)}
        className="btn btn-outline-primary ms-3"
      >
        View
      </button>
    </div>
  );
}
