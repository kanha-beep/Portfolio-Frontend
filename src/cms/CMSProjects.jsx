import { useEffect, useState } from "react";
import api from "../api.js";
import { useNavigate } from "react-router";
import ViewProjectButton from "../components/buttons/ViewProjectButton.jsx";
import DeleteProjectButton from "../components/buttons/DeleteProjectButton.jsx";
import AddProjectButton from "../components/buttons/AddProjectButton.jsx";
export default function CMSProjects() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    url_1: "",
    url_2: "",
  });
  const handleChange = (e) => {
    setNewProject((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    const getAllProjects = async () => {
      const res = await api.get("/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
      console.log("all projects in managing:", res.data);
    };
    getAllProjects();
  }, []);
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description)
      return alert("Please enter details");
    const res = await api.post("/projects", newProject, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("add project: ", res.data);
    setProjects([...projects, res.data]);
    setNewProject({ title: "", description: "" });
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Manage Projects</h1>

      <section style={{ margin: "2rem 0" }}>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={handleChange}
            className="form-control my-2"
          />
          <input
            type="text"
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={handleChange}
            className="form-control my-2"
          />
          <input
            type="text"
            name="url_1"
            placeholder="Project Link 1"
            value={newProject.url_1}
            onChange={handleChange}
            className="form-control my-2"
          />
          <input
            type="text"
            name="url_2"
            placeholder="Project Link 2"
            value={newProject.url_2}
            onChange={handleChange}
            className="form-control my-2"
          />
          <AddProjectButton />
        </form>
      </section>

      <section>
        {projects.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="d-flex">
              <DeleteProjectButton
                projects={projects}
                token={token}
                p={p}
                setProjects={setProjects}
              />
              <ViewProjectButton navigate={navigate} p={p} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
