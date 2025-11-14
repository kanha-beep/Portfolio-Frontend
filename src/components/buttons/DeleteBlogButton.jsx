import React from "react";
import api from "../../api";

export default function DeleteBlogButton({token, p, id, setBlogs, blogs}) {
    const handleDelete = async (id) => {
    await api.delete(`/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBlogs(blogs.filter((b) => b._id !== id));
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
