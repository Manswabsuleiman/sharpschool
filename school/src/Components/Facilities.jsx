import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FacilitiesInfo = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive flex direction for text-image section
  const isMobile = windowWidth < 768;

  // Variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const cardData = [
    {
      title: "Modern & Engaging Classes",
      desc: "Our classrooms are spacious, well-ventilated, and equipped with child-friendly learning materials that support creativity and strong student performance.",
    },
    {
      title: "24/7 CCTV Surveillance",
      desc: "Our school compound is secured with high-quality CCTV cameras, ensuring maximum safety and real-time monitoring throughout the learning day.",
    },
    {
      title: "Clean & Well-Equipped Kitchen",
      desc: "Meals are prepared daily in a hygienic and well-maintained kitchen by trained staff who strictly follow food safety guidelines.",
    },
    {
      title: "Clean & Child-Friendly Toilets",
      desc: "Our restrooms are cleaned and sanitized consistently throughout the day to guarantee a fresh, safe, and child-friendly environment.",
    },
    {
      title: "Dedicated First Aid Team",
      desc: "We have a trained first-aid response team available on-site to ensure children receive quick and appropriate care in emergencies.",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        padding: isMobile ? "40px 15px" : "60px 20px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        <h2
          style={{
            fontSize: isMobile ? "28px" : "36px",
            fontWeight: "700",
            color: "#001B47",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Our School Facilities & Safety Standards
        </h2>

        {/* GRID SECTIONS */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          {cardData.map((item, index) => (
            <motion.div
              key={index}
              style={{
                flex: isMobile ? "1 1 100%" : "1 1 350px",
                padding: "20px",
                borderRadius: "12px",
                backgroundColor: "#F5F8FF",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  marginBottom: "10px",
                  color: "#003B99",
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: "16px", color: "#555" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* TEXT & IMAGE SECTION */}
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "30px",
          }}
        >
          {/* TEXT LEFT */}
          <motion.div
            style={{
              flex: isMobile ? "1 1 100%" : "1 1 500px",
              paddingRight: isMobile ? "0" : "20px",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <h2
              style={{
                fontSize: isMobile ? "28px" : "32px",
                fontWeight: "700",
                color: "#001B47",
                marginBottom: "15px",
              }}
            >
              A Safe & Supportive Environment for Every Child
            </h2>

            <p
              style={{
                fontSize: "16px",
                color: "#555",
                lineHeight: "1.6",
                marginBottom: "15px",
              }}
            >
              At SharpMind School, safety, hygiene, and comfort are part of our daily
              commitment. We ensure that every facility—from classes to restrooms—is
              designed to support a healthy and productive learning atmosphere.
            </p>

            <p
              style={{
                fontSize: "16px",
                color: "#555",
                lineHeight: "1.6",
              }}
            >
              Parents trust us because we maintain strict standards, operate with transparency,
              and prioritize the well-being of every child under our care.
            </p>
          </motion.div>

          {/* IMAGE RIGHT */}
          <motion.div
            style={{
              flex: isMobile ? "1 1 100%" : "1 1 450px",
              textAlign: "center",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
            <img
              src="/Pictures/Wallpaper.png"
              alt="School Facility"
              style={{
                width: "100%",
                maxWidth: "450px",
                borderRadius: "12px",
                boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesInfo;
