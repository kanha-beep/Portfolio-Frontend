import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function Projects({ error, setError }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const getAllProjects = async () => {
    try {
      const res = await api.get("/projects");
      console.log("get projects to show", res?.data);
      setProjects(res?.data);
    } catch (error) {
      console.log("error in get projects", error?.response?.data?.message);
      setError(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  return (
    <div className="container">
      <h1 className=" my-3 text-center">My Projects</h1>
      {projects.length === 0 && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="row">
        {projects.map((p) => (
          <div key={p._id} className="col-md-4 mb-3">
            <div className="card h-100">
              <h3 className="card-header">{p.title}</h3>
              <div className="card-body">
                <p className="card-text">{p.description}</p>
              </div>
              <div className="card-footer">
                Want a project like this for you.
                <button
                  onClick={() =>
                    navigate("/contacts", { state: { project: p } })
                  }
                  className="btn btn-primary btn-sm ms-2"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
