import { useState } from "react";
import { Button, Spinner, Alert } from "react-bootstrap";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    setLoading(true);
    try {
      // Example API call placeholder
      // const res = await api.get("/some-endpoint");
      // setMessage(res.data.message);
      setTimeout(() => setMessage("Welcome to my portfolio!"), 1000); // demo
    } catch (err) {
      setMessage("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-5 text-center">
      <h1 className="mb-3">Welcome to My Portfolio</h1>
      <p>Showcasing my skills and achievements.</p>
      <Button variant="primary" onClick={handleClick} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : "Say Hello"}
      </Button>
      {message && <Alert variant="info" className="mt-3">{message}</Alert>}
    </main>
  );
}
