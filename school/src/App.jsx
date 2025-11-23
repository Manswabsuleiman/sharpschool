import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navbar from "./Components/Navbar";
import FeeStructure from "./pages/FeeStructure";
import Admission from "./pages/Admission";
import Library from "./pages/Library";
import Exams from "./pages/Exams";
import BusRoute from "./pages/BusRoute";
import SchoolUniform from "./pages/SchoolUniform";
import Payments from "./pages/Payments";
import LoginModal from "./Components/LoginModal";

const App = () => {
  // Track parent login state
  const [parent, setParent] = useState(() => {
    const storedParent = localStorage.getItem("parent");
    return storedParent ? JSON.parse(storedParent) : null;
  });

  const [loginOpen, setLoginOpen] = useState(false);

  // Listen for login/logout events dispatched by LoginModal
  useEffect(() => {
    const handleLogin = () => {
      const storedParent = localStorage.getItem("parent");
      setParent(storedParent ? JSON.parse(storedParent) : null);
    };

    const handleLogout = () => setParent(null);

    window.addEventListener("parentLogin", handleLogin);
    window.addEventListener("parentLogout", handleLogout);

    return () => {
      window.removeEventListener("parentLogin", handleLogin);
      window.removeEventListener("parentLogout", handleLogout);
    };
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("parent");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setParent(null);
    window.dispatchEvent(new Event("parentLogout"));
  };

  return (
    <div>
      <Navbar
        parent={parent}
        onLoginClick={() => setLoginOpen(true)}
        onLogoutClick={logout}
      />

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        setParent={setParent} // update App state directly after login
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feestructure" element={<FeeStructure parent={parent} />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/library" element={<Library />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/route" element={<BusRoute />} />
        <Route path="/uniform" element={<SchoolUniform />} />
        <Route path="/payments" element={<Payments parent={parent} />} />
      </Routes>
    </div>
  );
};

export default App;
