import React from "react";
import { motion } from "framer-motion";

const Layout = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <motion.img
        src="./Pictures/Home.png"
        alt=""
        style={{
          width: "100vw",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.5 }}
      />

      {/* Dark Overlay */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 20, 60, 0.75)",
          zIndex: 2,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2 }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{
            color: "#5FA4FF",
            marginBottom: "15px",
            letterSpacing: "1px",
            fontSize: "14px",
          }}
        >
          ARE YOU READY FOR THIS OFFER
        </motion.p>

        <motion.h1
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{
            fontSize: "48px",
            fontWeight: "700",
            lineHeight: "1.2",
            maxWidth: "900px",
          }}
        >
          40% Offer First <span style={{ color: "red" }}>100 Student’s</span> For
          Featured Topics by Education Category
        </motion.h1>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{
            marginTop: "20px",
            maxWidth: "700px",
            fontSize: "16px",
            opacity: 0.9,
          }}
        >
          Get unlimited access to 6,000+ of Udemy’s top courses for your team.
          Learn and improve skills across business, tech, design, and more.
        </motion.p>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              padding: "12px 30px",
              background: "#0053FF",
              border: "none",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "600",
              minWidth: "180px",
            }}
          >
            JOIN WITH US →
          </button>

          <button
            style={{
              padding: "12px 30px",
              background: "transparent",
              border: "1px solid white",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "600",
              minWidth: "180px",
            }}
          >
            BECOME A TEACHER →
          </button>
        </motion.div>
      </div>

      {/* Responsive adjustments */}
      <style>
        {`
          @media (max-width: 1024px) {
            h1 {
              font-size: 40px !important;
            }
            p {
              font-size: 14px !important;
            }
          }

          @media (max-width: 768px) {
            h1 {
              font-size: 32px !important;
            }
            p {
              font-size: 13px !important;
            }
          }

          @media (max-width: 480px) {
            h1 {
              font-size: 24px !important;
            }
            p {
              font-size: 12px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
