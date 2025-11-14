import { Link } from "react-router-dom";
import ManageProjectButton from "../components/buttons/ManageProjectButton";
import ManageBlogButton from "../components/buttons/ManageBlogButton";
export default function CMSHome() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1 className="text-center">CMS Dashboard</h1>
      <p>Now I can manage my projects and blogs from here.</p>

      <section style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Link to="/cms/projects">
          <ManageProjectButton />
        </Link>
        <Link to="/cms/blogs">
          <ManageBlogButton />
        </Link>
      </section>
    </main>
  );
}
