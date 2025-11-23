import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Phone, Mail, Clock, Facebook, Twitter, Linkedin, Youtube, User,
  LayoutGrid, Search, ShoppingCart, Heart, ChevronDown, GraduationCap, ArrowRight
} from "lucide-react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const navLinks = [


  { name: "HOME", path: "/" },
  { name: "FEE STRUCTURE", path: "/feestructure" },
  { name: "ADMISSION", path: "/admission" },
  { name: "LIBRARY", path: "/library" },
  { name: "EXAMS", path: "/exams" },
  { name: "BUS ROUTE", path: "/route" },
  { name: "SCHOOL UNIFORM", path: "/uniform" },
];

const socialLinks = [
  { Icon: Facebook, href: "#facebook" },
  { Icon: Twitter, href: "#twitter" },
  { Icon: Linkedin, href: "#linkedin" },
  { Icon: Youtube, href: "#youtube-yt" },
  { Icon: Youtube, href: "#youtube-play" },
];

const NavItem = ({ name, path, onClick }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      onClick={onClick}
    >
      <span>{name}</span>
      {(name === "COURSES" || name === "TEACHERS" || name === "PAGES" || name === "BLOG") && (
        <ChevronDown size={14} />
      )}
    </NavLink>
  );
};

const Navbar = ({ parent, onLoginClick, onLogoutClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState("");

  const navigate = useNavigate()




  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const targetDate = new Date("2026-01-05T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setCountdown("Enrollment Open!");
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="navbar-container">
      <div className="top-bar">
        <div className="contact-info">
          <div><Phone size={14} /> 254 723 775 913</div>
          <div><Mail size={14} /> info@sharpmind.com</div>
          <div>
            <Clock size={14} /> Mon - Sat: 8:00 - 15:00
            <span style={{ marginLeft: "15px", fontWeight: "700", color: "#ff0000ff" }}>
              Intake Jan 2026: {countdown}
            </span>
          </div>
        </div>

        <div className="social-auth">
          <div className="social-links">
            {socialLinks.map(({ Icon, href }, i) => (
              <a key={i} href={href}><Icon size={16} /></a>
            ))}
          </div>

          {/* Login / Logout Button */}
          {parent ? (
            <button
              onClick={onLogoutClick}
              className="login-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              <User size={16} /> Logout
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="login-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              <User size={16} /> Login / Register
            </button>
          )}
        </div>
      </div>

      <div className="main-header">
        <div className="logo">
          <GraduationCap size={40} />
          <button onClick={() => navigate('/')} style={{color: "#007bff", fontSize: "24px", cursor: "pointer", fontWeight: "bold", background: "#05091c", border: "none", }}>
                      <span>SharpMind School</span>

          </button>
        </div>

        <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <NavItem key={link.path} {...link} onClick={closeMenu} />
          ))}
        </nav>

        <div className="nav-actions">
          <div className="search-bar">
            <div className="categories">
              <LayoutGrid size={18} />
              <select>
                <option>Categories</option>
              </select>
            </div>
            <input type="text" placeholder="Search..." />
            <button><Search size={20} /></button>
          </div>

          <div className="icons">
            <div className="icon-heart"><Heart size={20} /><span>2K</span></div>
           </div>

          <NavLink to="/admission">
            <button className="apply-btn">
              APPLY NOW <ArrowRight size={16} />
            </button>
          </NavLink>

          <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={`line ${isMenuOpen ? "open" : ""}`}></span>
            <span className={`line ${isMenuOpen ? "open" : ""}`}></span>
            <span className={`line ${isMenuOpen ? "open" : ""}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
