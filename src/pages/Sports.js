import React from 'react';
import Gallery from '../components/Gallery';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Sports = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pb-10 relative" style={{ overflowX: 'hidden' }}>
      {/* Large Back Arrow (fixed to top-left) */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          zIndex: 10,
        }}
        aria-label="Back"
      >
        <ChevronLeft size={48} strokeWidth={2} color="white" />
      </button>

      {/* Combined Heading for Sports and Gallery */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '3rem',
          margin: '4rem 0 2rem 0',
          fontFamily: `'Playfair Display', serif`,
          fontSize: '3rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        <span>Sports</span>
        <span>Gallery</span>
      </div>

      {/* Gallery Section */}
      <div className="max-w-6xl mx-auto px-4">
        <Gallery folder="sports" />
      </div>
    </div>
  );
};

export default Sports;
