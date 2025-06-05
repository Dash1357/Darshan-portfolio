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

      {/* Event Sections */}
      <div className="max-w-6xl mx-auto px-4">
        <EventSection
          title="Spiti Valley"
          description="Remote, rugged, and breathtakingly silent — Spiti isn’t a destination; it’s a feeling. High in the trans-Himalayan belt, this cold desert valley cradles ancient monasteries, frozen rivers, and skies that feel closer to space than Earth. This collection captures its raw solitude and sacred stillness — an invitation to slow down and absorb the untouched."
          folder="travel/spiti"
          reverse={false}
        />

        <EventSection
          title="Aviation"
          description="From taxi to takeoff, this series salutes the marvel of aviation. These aren't just machines in motion — they are poetry in precision. I’ve tried to frame the symmetry of flight: the anticipation on the runway, the graceful arcs through cloud banks, the sharp lines of wings slicing through atmosphere."
          folder="travel/aviation"
          reverse={true}
        />

        <EventSection
          title="Astrophotography"
          description="Beneath vast Indian skies, far from the noise of cities, lies a canvas most never see. This series slows time and opens the heavens — galaxies spiraling in silence, star trails painting ancient skies, and Milky Way arcs that seem too perfect to be real. These frames are born from long hours, cold fingers, and a devotion to capturing what the naked eye cannot."
          folder="travel/astro"
          reverse={false}
        />

        <EventSection
          title="Symmetrical Photography"
          description="There’s harmony in stillness, poetry in patterns. This segment explores symmetry not as technique, but as emotion — in reflections, architecture, and aligned moments that speak to our inner balance. Whether it's a lone building mirroring its surroundings or a human silhouette centered in geometry, symmetry reveals order in a chaotic world."
          folder="travel/symmetry"
          reverse={true}
        />
      </div>
    </div>
  );
};

export default Travel;
