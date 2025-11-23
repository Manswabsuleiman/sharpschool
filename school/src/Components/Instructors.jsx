import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Instructors = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const instructors = [
    { name: "Mr. Joshua Erick", img: "/Pictures/Teacher1.png" },
    { name: "Mrs. Faith Clara", img: "/Pictures/Teacher2.png" },
    { name: "Mr. Peter Mwangi", img: "/Pictures/Teacher4.png" },
    { name: "Mrs. Agnes Wairimu", img: "/Pictures/Teacher3.png" },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div
      style={{
        width: "100%",
        padding: isMobile ? "40px 15px" : "60px 20px",
        backgroundColor: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        {/* TITLE */}
        <h2
          style={{
            textAlign: "center",
            fontSize: isMobile ? "28px" : "36px",
            fontWeight: "700",
            color: "#001B47",
            marginBottom: "40px",
          }}
        >
          Meet Our Instructors
        </h2>

        {/* FLEX INSTRUCTORS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {instructors.map((inst, index) => (
            <motion.div
              key={index}
              style={{
                flex: isMobile
                  ? "1 1 100%"
                  : isTablet
                  ? "1 1 calc(50% - 20px)"
                  : "1 1 calc(25% - 20px)",
                minWidth: "250px",
                textAlign: "center",
                backgroundColor: "#F9FAFB",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              transition={{ delay: index * 0.2 }}
            >
              <div
                style={{
                  width: "100%",
                  height: isMobile ? "180px" : "220px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "15px",
                }}
              >
                <img
                  src={inst.img}
                  alt={inst.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <h3
                style={{
                  fontSize: isMobile ? "18px" : "20px",
                  fontWeight: "600",
                  color: "#001B47",
                }}
              >
                {inst.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructors;
