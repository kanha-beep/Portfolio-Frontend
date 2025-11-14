import { useEffect, useState } from "react";
import api from "../api";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const getAllBlogPosts = async () => {
    const res = await api.get("/blogs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("get posts", res.data);
    setPosts(res.data)
  };
  useEffect(() => {
    getAllBlogPosts();
  }, [token]);
  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Blog</h1>
      {posts.map((post) => (
        <article
          key={post._id}
          style={{
            borderBottom: "1px solid #ccc",
            margin: "1rem 0",
            paddingBottom: "1rem",
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.summary}</p>
        </article>
      ))}
    </main>
  );
}
