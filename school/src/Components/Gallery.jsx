import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Gallery = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const images = [
    "./Pictures/Wallpaper7.png",
    "./Pictures/Wallpaper3.png",
    "./Pictures/Wallpaper4.png",
    "./Pictures/Wallpaper2.png",
    "./Pictures/Wallpaper6.png",
    "./Pictures/Wallpaper5.png",
  ];

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <div
      style={{
        width: "100%",
        padding: isMobile ? "30px 10px" : "60px 15px",
        backgroundColor: "#ffffffff",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: isMobile ? "28px" : "36px",
            fontWeight: "700",
            color: "#001B47",
            marginBottom: "30px",
          }}
        >
          School Gallery
        </h2>

        {/* GALLERY GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
              ? "repeat(2, 1fr)"
              : "repeat(3, 1fr)",
            gap: "15px",
          }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              style={{
                width: "100%",
                aspectRatio: index < 2 && !isMobile ? "16/9" : "4/3",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0px 6px 18px rgba(3, 1, 8, 0.15)",
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
              transition={{ delay: index * 0.15 }}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
