import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import EventSection from '../components/EventSection';

const Travel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pb-10 relative" style={{ overflowX: 'hidden' }}>
      {/* Back Arrow */}
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

      {/* Heading */}
      <div className="page-title-container"
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
          flexWrap: 'wrap',
          textAlign: 'center',
          padding: '0 1rem',
        }}
      >
        <span>Travel</span>
        <span>Gallery</span>
      </div>

      {/* Events */}
      <div className="max-w-6xl mx-auto px-4">
        <EventSection
          title="Spiti Valley"
          description="Desolate yet divine — Spiti is where the Earth breathes in silence. Jagged ridges, frozen rivers, and monasteries in the mist. This series captures its soul with light, shadow, and serenity etched into every frame."
          folder="travel/spiti"
          reverse={false}
        />

        <EventSection
          title="Aviation"
          description="Metal birds in graceful motion. This series frames the power and elegance of flight — from runway roars to cruising calm. A tribute to aviation’s symmetry, precision, and silent confidence."
          folder="travel/aviation"
          reverse={true}
        />

        <EventSection
          title="Astrophotography"
          description="The universe, unrushed and infinite. Through long exposure and quiet patience, these frames reveal star trails, galaxies, and cosmic dust above remote Indian skies. A dance of light stitched into the canvas of night."
          folder="travel/astro"
          reverse={false}
        />

        <EventSection
          title="Symmetrical Photography"
          description="Where architecture and timing converge — symmetry is more than balance, it's emotion. This series is an exploration of lines, reflections, and structured calm, captured across cities and landscapes alike."
          folder="travel/symmetry"
          reverse={true}
        />
      </div>
    </div>
  );
};

export default Travel;
