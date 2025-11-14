// ✅ BlogView.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import EditBlogButton from "../components/buttons/EditBlogButton.jsx"
export default function SingleBlogs() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { blogId } = useParams(); // 🧠 get blog id from URL
  const [blog, setBlog] = useState(null);

  // 🧩 fetch single blog
  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await api.get(`/blogs/${blogId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("single blog: ", res.data);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err.response.data.message);
      }
    };
    getBlog();
  }, [blogId]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
      <p className="text-gray-600 mb-4">
        Posted on: {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <p className="text-lg leading-relaxed">{blog.summary}</p>
      <EditBlogButton navigate={navigate} blogId={blogId} />
    </div>
  );
}
