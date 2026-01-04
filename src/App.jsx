import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
// index.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Pages
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Blog from "./pages/Blog.jsx";
import EditBlogs from "./templates/EditBlogs.jsx";
import SingleBlogs from "./templates/SingleBlogs.jsx";

// CMS Dashboard
import CMSHome from "./cms/CMSHome.jsx";
import CMSProjects from "./cms/CMSProjects.jsx";
import CMSBlog from "./cms/CMSBlog.jsx";
import Auth from "./auth/Auth.jsx";
import Logout from "./auth/Logout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useEffect, useState } from "react";
import SingleProjects from "./templates/SingleProjects.jsx";
import EditProjects from "./templates/EditProjects.jsx";
import axios from "axios";

function App() {
  const [isAuth, setIsAuth] = useState(false); // toggle login/signup
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const checkAuthStatus = async () => {
    try {
      const API_URL = import.meta.env.DEV
        ? import.meta.env.VITE_API_URL
        : import.meta.env.VITE_API_URL;
      const res = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });
      console.log("app: ", res?.data);
      setUser(res?.data);
      if (res) {
        setIsLoggedIn(true);
        // setUser(res?.data);
      }
    } catch (error) {
      console.log("Not authenticated");
    }
  };
  useEffect(() => {
    checkAuthStatus();
  }, []);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/projects"
          element={<Projects error={error} setError={setError} />}
        />
        <Route path="/projects/:projectsId" element={<SingleProjects />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:blogId" element={<SingleBlogs />} />
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          {/* projects */}
          <Route path="/projects/:projectsId/edit" element={<EditProjects />} />
          {/* blogs */}
          <Route path="/blogs/:blogId/edit" element={<EditBlogs />} />
          {/* CMS routes */}
          <Route path="/cms" element={<CMSHome />} />
          <Route path="/cms/projects" element={<CMSProjects />} />
          <Route path="/cms/blogs" element={<CMSBlog />} />
        </Route>
        {/* auth */}
        <Route
          path="/auth"
          element={
            <Auth
              setIsAuth={setIsAuth}
              isAuth={isAuth}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              setUser={setUser}
              checkAuthStatus={checkAuthStatus}
            />
          }
        />
        <Route
          path="/logout"
          element={<Logout setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
