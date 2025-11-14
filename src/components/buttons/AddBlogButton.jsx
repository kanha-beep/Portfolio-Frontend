import React from "react";
import api from "../../api";

export default function AddBlogButton({
  token,
  blogs,
  setBlogs,
  setNewBlog,
  newBlog,
}) {
  const handleAdd = async () => {
    try {
      if (!newBlog.title || !newBlog.summary) return alert("Please enter details");
      const res = await api.post("/blogs", newBlog, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("new blog: ", res.data);
      setBlogs([...blogs, res.data]);
      setNewBlog({ title: "", summary: "" });
    } catch (e) {
      console.log("error", e.response.data.message);
    }
  };
  return (
    <div>
      <button className="btn btn-outline-primary mt-2" onClick={handleAdd}>
        Add Blog Post
      </button>
    </div>
  );
}
