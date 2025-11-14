import React from "react";

export default function EditBlogButton({ navigate , blogId}) {
  return (
    <div>
      {" "}
      <button
        onClick={() => navigate(`/blogs/${blogId}/edit`)}
        className="btn btn-outline-primary"
      >
        Edit Blog
      </button>
    </div>
  );
}
