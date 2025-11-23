import React from "react";
import { motion } from "framer-motion";

const Info = () => {
  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F9FC",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* IMAGE SECTION */}
        <motion.div
          style={{
            flex: "1 1 450px",
            marginBottom: "5px",
            textAlign: "center",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          <img
            src="./Pictures/Info.png"
            alt="SharpMind Students"
            style={{
              width: "100%",
              maxWidth: "450px",
              borderRadius: "12px",
              boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
            }}
          />
        </motion.div>

        {/* TEXT CONTENT */}
        <motion.div
          style={{
            flex: "1 1 500px",
            paddingLeft: "20px",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
        >
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#001B47",
              lineHeight: "1.3",
            }}
          >
            Why Parents Choose{" "}
            <span style={{ color: "#0053FF" }}>SharpMind School</span>
          </h2>

          {/* PERFORMANCE - NOW USING CLASSNAME */}
          <div className="info-text-block">
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#003B99",
                marginBottom: "8px",
              }}
            >
              Exceptional Student Performance
            </h3>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.5" }}>
              Our students consistently achieve outstanding academic results
              through structured learning, personalized support, and continuous improvement.
            </p>
          </div>

          {/* TEACHER EXPERIENCE - NOW USING CLASSNAME */}
          <div className="info-text-block">
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#003B99",
                marginBottom: "8px",
              }}
            >
              Experienced & Passionate Teachers
            </h3>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.5" }}>
              Our certified teachers bring years of experience, creativity, and dedication to ensure every child reaches their full potential.
            </p>
          </div>

          {/* SUPPORTIVE ENVIRONMENT - FINAL BLOCK DOESN'T NEED MARGIN-BOTTOM */}
          <div>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#003B99",
                marginBottom: "8px",
              }}
            >
              Supportive Learning Environment
            </h3>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.5" }}>
              We create a warm, safe, and motivating environment that encourages curiosity, leadership, and personal growth.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Responsive adjustments using standard CSS classes */}
      <style>
        {`
          /* Default spacing for the text blocks */
          .info-text-block {
            margin-bottom: 25px; /* Original desktop spacing */
          }

          @media (max-width: 1024px) {
            h2 {
              font-size: 32px !important;
            }
            h3 {
              font-size: 20px !important;
            }
            p {
              font-size: 15px !important;
            }
            /* Reduce block margin slightly for tablets */
            .info-text-block {
                margin-bottom: 20px;
            }
          }

          @media (max-width: 768px) {
            /* Fixes the "far distance" issue by significantly reducing the margin */
            .info-text-block {
                margin-bottom: 15px; 
            }

            div[style*='flex-wrap: wrap'] {
              flex-direction: column !important;
              align-items: center !important;
            }

            div[style*='padding-left: 20px'] {
              padding-left: 0 !important;
              text-align: center !important;
            }

            img {
              max-width: 80% !important;
            }

            h2 {
              font-size: 28px !important;
              margin-bottom: 15px !important; /* Reduced margin for h2 */
            }

            h3 {
              font-size: 18px !important;
            }

            p {
              font-size: 14px !important;
            }
          }

          @media (max-width: 480px) {
            .info-text-block {
                margin-bottom: 10px; /* Even smaller margin for small phones */
            }
            h2 {
              font-size: 24px !important;
            }
            h3 {
              font-size: 16px !important;
            }
            p {
              font-size: 13px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Info;