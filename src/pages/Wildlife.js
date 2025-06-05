import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import EventSection from '../components/EventSection';

const Wildlife = () => {
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
        <span>Wildlife</span>
        <span>Gallery</span>
      </div>

      {/* Event Sections */}
      <div className="max-w-6xl mx-auto px-4">
        <EventSection
          title="Kabini Wildlife Reserve"
          description="Where forest meets river, and silence meets the unexpected. Kabini is where nature speaks in rustles, roars, and glances from the underbrush. This series trails the mystery of this iconic reserve — elusive leopards draped across tree limbs, elephants emerging from fog, and golden light breaking through thick canopy."
          folder="wildlife/kabini"
          reverse={false}
        />

        <EventSection
          title="Birds"
          description="To watch a bird in flight is to witness freedom at its purest. This series captures the grace, color, and quiet stories of avian life — from the rhythmic stillness of herons to the sudden flutters of finches mid-feed. Each frame preserves the poetry of motion and the quiet elegance of wings in the wild."
          folder="wildlife/birds"
          reverse={true}
        />

        <EventSection
          title="Jim Corbett Wildlife Reserve"
          description="Legendary in name and legacy, Corbett is more than a reserve — it’s a living epic. Nestled in Uttarakhand’s rich wilderness, its landscapes carry history, mystery, and the ever-present pulse of the wild. This series brings you face-to-face with morning mists curling around sal trees, tiger trails barely visible in the mud, and the quiet confidence of elephants in their element."
          folder="wildlife/corbett"
          reverse={false}
        />
      </div>
    </div>
  );
};

export default Wildlife;
