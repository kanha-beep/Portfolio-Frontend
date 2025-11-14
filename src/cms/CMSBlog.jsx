import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router";
import AddBlogButton from "../components/buttons/AddBlogButton.jsx";
import DeleteBlogButton from "../components/buttons/DeleteBlogButton.jsx";
import ViewBlogButton from "../components/buttons/ViewBlogButton.jsx";
export default function CMSBlog() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", summary: "" });
  const handleChange = (e) => {
    setNewBlog((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    const getAllBlogPosts = async () => {
      const res = await api.get("/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("get posts", res.data);
      setBlogs(res.data);
    };
    getAllBlogPosts();
  }, [setBlogs]);
  // console.log("blogs", blogs);
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Manage Blog Posts</h1>
      <section style={{ margin: "2rem 0" }}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={newBlog.title}
          onChange={handleChange}
          className="form-control"
        />
        <textarea
          placeholder="Post Summary"
          name="summary"
          value={newBlog.summary}
          onChange={handleChange}
          className="form-control mt-2"
        />
        <AddBlogButton
          token={token}
          blogs={blogs}
          setBlogs={setBlogs}
          setNewBlog={setNewBlog}
          newBlog={newBlog}
        />
      </section>
      <section>
        {blogs.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            <div className="d-flex">
              <DeleteBlogButton token={token} p={p} setBlogs={setBlogs} blogs={blogs}/>
              <ViewBlogButton navigate={navigate} p={p} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
