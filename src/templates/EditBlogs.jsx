// ✅ BlogEdit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import UpdateBlogButton from "../components/buttons/UpdateBlogButton.jsx"
export default function EditBlogs() {
  const { blogId } = useParams(); // 🧠 get blog id from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [blog, setBlog] = useState({ title: "", summary: "" });

  // 🧩 fetch current blog details
  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await api.get(`/blogs/${blogId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err.response.data.message);
      }
    };
    getBlog();
  }, [blogId, token]);

  // 🧠 handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/blogs/${blogId}/edit`, blog, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("new updated: ", res.data);
      navigate("/cms/blogs"); // redirect after success
    } catch (err) {
      console.error("Error updating blog:", err.response.data.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          className="p-2 form-control"
          required
        />
        <br />
        <textarea
          placeholder="Summary"
          value={blog.summary}
          onChange={(e) => setBlog({ ...blog, summary: e.target.value })}
          className="p-2 form-control"
          style={{height:"10rem"}}
          required
        />
        <br />
        <UpdateBlogButton/>
      </form>
    </div>
  );
}
