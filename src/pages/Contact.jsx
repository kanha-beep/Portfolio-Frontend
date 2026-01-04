import { useState } from "react";
import api from "../api";
import SendContactButton from "../components/buttons/SendContactButton";
import { useLocation, useNavigate } from "react-router";
export default function Contact() {
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    projectName: "",
    projectId: "",
  });
  const [contactData, setContactData] = useState([]);
  const navigate = useNavigate();
  const projectDetails = location?.state?.project;
  // console.log("projectDetails:", projectDetails);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = {
        ...form,
        projectName: projectDetails?.title || form.projectName,
        projectId: projectDetails?._id || form.projectId,
      };
      const res = await api.post("/contacts", formData);
      console.log("contact received", res.data);
      setContactData((p) => [...p, res.data]);
      setForm({ name: "", email: "", message: "" });
    } catch (e) {
      console.log("error: ", e.response?.data);
    }
  };

  return (
    <div className="mx-auto p-2" style={{ maxWidth: "600px" }}>
      <h1 className="text-center">Contact Me</h1>
      <form
        onSubmit={handleSubmit}
        className="p-2 d-flex flex-column justify-content-center"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="form-control my-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="form-control my-2"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          className="form-control my-2"
          required
        />
        <div>
          <p>
            Project Name: <b>{projectDetails?.title}</b>
          </p>
        </div>
        <div className="my-2 mx-auto">
          <SendContactButton />
        </div>
      </form>
      <section>
        {contactData.length >= 0 &&
          contactData.map((c) => (
            <div className="">
              <div key={c._id}>
                <h3>Contact Sent</h3>
                Name: <b>{c.name}</b>
                <br />
                Email: <b>{c.email}</b>
                <br />
              </div>
              <div className="mt-3 d-flex align-items-center gap-2">
                <span>Go to</span>
                <button className="btn btn-primary btn-sm d-flex align-items-center" onClick={()=>navigate("/projects")}>
                  More Projects
                </button>
              </div>
            </div>
          ))}
        {/* {contactData && (
          <>
            <p>
              {" "}
              Name: <b>{contactData.name}</b>
            </p>
            <p>
              Email:<b>{contactData.name}</b>{" "}
            </p>
            <p>
              Password:<b>{contactData.name}</b>{" "}
            </p>
          </>
        )} */}
      </section>
    </div>
  );
}
