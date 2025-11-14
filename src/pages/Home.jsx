import { useEffect, useState } from "react";
import api from "../api"; // Axios instance with backend baseURL
import { Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Fetch projects from backend on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects"); // Backend endpoint
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading...
      </div>
    );
  console.log(projects);
  return (
    <main className="container py-4 text-center">
      <h1 className="mb-3">Welcome to My Portfolio</h1>
      <p>Showcasing my projects, skills, and achievements.</p>

      <section className="mt-5">
        <h2>Featured Projects</h2>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card
                key={project._id}
                style={{ width: "18rem" }}
                className="shadow-sm"
              >
                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                  {/* <Card.Text>{project.description}</Card.Text> */}
                  <div className="row justify-content-between">
                    <Button
                      className="col-md-6 col-12"
                      variant="primary"
                      onClick={() => (window.location.href = project.url_1)}
                    >
                      First link
                    </Button>
                    <Button
                      className="col-md-6 col-12"
                      variant="primary"
                      onClick={() => (window.location.href = project.url_2)}
                    >
                      Second Link
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </section>
    </main>
  );
}
