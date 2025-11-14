export default function Footer() {
  return (
    <footer
      style={{
        padding: "1rem",
        background: "#222",
        color: "#fff",
        textAlign: "center",
        position: "absolute",
        bottom: "1px",
        width:"100%"
      }}
    >
      &copy; {new Date().getFullYear()} My Portfolio
    </footer>
  );
}
