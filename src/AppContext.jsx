// // src/context/AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const checkAuthStatus = async () => {
//     try {
//       const API_URL = import.meta.env.DEV
//         ? import.meta.env.VITE_DEV_API_URL
//         : import.meta.env.VITE_API_URL;

//       const res = await axios.get(`${API_URL}/auth/me`, {
//         withCredentials: true,
//       });

//       setUser(res.data);
//       setIsLoggedIn(true);
//     } catch {
//       setUser(null);
//       setIsLoggedIn(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, isLoggedIn, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
