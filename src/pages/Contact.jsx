import { useState } from "react";
import api from "../api";
import SendContactButton from "../components/buttons/SendContactButton"
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [contactData, setContactData] = useState([]);

  const token = localStorage.getItem("token");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("data sent", form);
      const res = await api.post("/contacts", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("contact received", res.data);
      setContactData((p) => [...p, res.data]);
      setForm({ name: "", email: "", message: "" });
    } catch (e) {
      console.log("error: ", e.response?.data?.message);
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
        <div className="my-2 mx-auto">
         <SendContactButton/>
        </div>
      </form>
      <section>
        {contactData.length >= 0 &&
          contactData.map((c) => (
            <div key={c._id}>
              <h3>This is what you typed</h3>
              Name: <b>{c.name}</b>
              <br />
              Email: <b>{c.email}</b>
              <br />
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
