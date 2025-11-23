import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Results = () => {
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const handleClick = (e) => {
    e.preventDefault(); // Prevent immediate navigation
    setLoading(true);

    // Simulate load duration
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/exams"; // Navigate after loading
    }, 2000); // 2 seconds
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "30px 15px" : "40px 20px",
        background: "linear-gradient(to bottom right, #002366, #0047ab)",
        color: "white",
        textAlign: "center",
        position: "relative", // Needed for loading bar
      }}
    >
      {/* Loading Bar */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              height: "4px",
              backgroundColor: "#1E90FF",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>

      <div
        style={{
          maxWidth: isMobile ? "90%" : "700px",
          width: "100%",
          padding: isMobile ? "25px" : "40px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "16px",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: isMobile ? "28px" : "42px",
            marginBottom: isMobile ? "15px" : "20px",
            fontWeight: "700",
            letterSpacing: "1px",
            textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          KCPE Performance Results
        </h1>

        {/* Highlight Message */}
        <p
          style={{
            fontSize: isMobile ? "15px" : "18px",
            lineHeight: "1.6",
            opacity: 0.95,
            marginBottom: isMobile ? "20px" : "30px",
          }}
        >
          We are proud to present the outstanding KCPE results of our students.
          Their dedication, discipline, and hard work have consistently placed
          our school among the top performers nationwide.{" "}
          <span style={{ fontWeight: "700", color: "#FFD700" }}>
            Excellence is our tradition.
          </span>
        </p>

        {/* Big Highlight Box */}
        <div
          style={{
            background: "rgba(255,215,0,0.15)",
            padding: isMobile ? "15px" : "20px",
            borderRadius: "12px",
            border: "1px solid rgba(255,215,0,0.4)",
            marginBottom: isMobile ? "20px" : "35px",
            fontSize: isMobile ? "15px" : "17px",
            fontWeight: "600",
            textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          🎉 Over 90% of our candidates scored above 350 marks!
        </div>

        {/* Button Link */}
        <a
          href="/exams"
          onClick={handleClick}
          style={{
            display: "inline-block",
            padding: isMobile ? "12px 24px" : "14px 32px",
            background: "#FFD700",
            color: "#002366",
            fontWeight: "700",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: isMobile ? "16px" : "18px",
            boxShadow: "0 6px 18px rgba(255,215,0,0.5)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#ffe44d")}
          onMouseLeave={(e) => (e.target.style.background = "#FFD700")}
        >
          📘 Click Here to View Full National Exam Results
        </a>
      </div>
    </div>
  );
};

export default Results;
