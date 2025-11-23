import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AI from '../Components/AI';

const Exams = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile only image interaction
  const mobileProps = isMobile
    ? {
        drag: true,
        dragMomentum: false,
        whileTap: { scale: 1.2 },
        style: { cursor: "grab" },
        style: { cursor: "grab", touchAction: "none" }
      }
    : {};

  return (
    <div
      style={{
        marginTop: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header animation */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          fontSize: isMobile ? "22px" : "28px",
          fontWeight: "600",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Get to View Results of Past Students
      </motion.h2>

      {/* First Image */}
      <motion.img
        src="./Pictures/Excel.png"
        alt="Excel Preview 1"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        {...mobileProps}
        style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          marginBottom: "30px",
          touchAction: "none", // Important for mobile drag
        }}
      />

      {/* Second Image */}
      <motion.img
        src="./Pictures/Excel2.png"
        alt="Excel Preview 2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        {...mobileProps}
        style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          touchAction: "none",
        }}
      />

      <AI />
    </div>
  );
};

export default Exams;
