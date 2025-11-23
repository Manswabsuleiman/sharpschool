import React, { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import AI from '../Components/AI';
import Footer from '../Components/Footer';

const Library = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive image sizes
  const smallImgWidth = windowWidth < 500 ? "100%" : windowWidth < 900 ? "45%" : "250px";

  return (
    <>
      <div style={{ 
        marginTop: '150px', 
        padding: '20px', 
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '1400px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '30px',
            textAlign: 'center',
            flexWrap: 'wrap'
          }}
        >
          <GraduationCap size={40} color="#003cffff" />
          <h2 style={{ margin: 0, color: '#003cffff', fontSize: windowWidth < 600 ? '20px' : '28px', fontWeight: 'bold' }}>
            SharpMind Library
          </h2>
        </div>

        {/* First Full Image */}
        <div style={{ width: '100%', marginBottom: '25px' }}>
          <img
            src="./Pictures/Library.png"
            alt="Library Main"
            style={{
              width: '100%',
              height: windowWidth < 600 ? '200px' : '350px',
              objectFit: 'cover',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }}
          />
        </div>

        {/* Small images - Fully responsive grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: windowWidth < 600 ? 'center' : 'space-between',
            gap: '15px',
            width: '100%',
          }}
        >
          {[2, 3, 4].map((num) => (
            <img
              key={num}
              src={`./Pictures/Library${num}.png`}
              alt={`Library ${num}`}
              style={{
                width: smallImgWidth,
                borderRadius: '8px',
                objectFit: 'cover',
                boxShadow: '0 3px 8px rgba(0,0,0,0.15)'
              }}
            />
          ))}
        </div>

        <AI />
      </div>

      {/* Full width Footer */}
      <Footer />
    </>
  );
};

export default Library;
