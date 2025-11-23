import React, { useState, useEffect } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const SocialIcon = ({ Icon, href = "#" }) => (
  <a
    href={href}
    style={{
      width: 36,
      height: 36,
      backgroundColor: "#3b82f6",
      color: "#fff",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
      textDecoration: "none",
      transition: "background-color 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
    aria-label={Icon.displayName || "Social link"}
  >
    <Icon size={18} />
  </a>
);

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const footerBg = {
    backgroundColor: "#0b1635",
    color: "#fff",
    fontFamily: "sans-serif",
    padding: isMobile ? "1.5rem 1rem" : "2rem 1rem",
  };

  const linkStyle = {
    color: "#d1d5db",
    textDecoration: "none",
    marginBottom: "0.5rem",
    display: "block",
    fontSize: isMobile ? "0.75rem" : "0.875rem",
    transition: "color 0.2s",
  };

  const links = ["Admission", "Fee Structure", "School Uniform", "Bus Route", "Exams"];

  return (
    <footer style={footerBg}>
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? "1rem" : "1.5rem",
        }}
      >
        {/* Links */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? "1rem" : "1.5rem",
          }}
        >
          {links.map((link, index) => (
            <a
              key={index}
              href="#"
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? 8 : 12 }}>
          <SocialIcon Icon={Facebook} />
          <SocialIcon Icon={Twitter} />
          <SocialIcon Icon={Linkedin} />
          <SocialIcon Icon={Instagram} />
        </div>

        {/* Copyright */}
        <div
          style={{
            fontSize: isMobile ? "0.7rem" : "0.875rem",
            color: "#9ca3af",
            textAlign: "center",
          }}
        >
          © 2025 SharpMind School. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
