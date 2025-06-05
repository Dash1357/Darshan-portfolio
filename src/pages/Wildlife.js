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

      {/* Events */}
      <div className="max-w-6xl mx-auto px-4">
        <EventSection
          title="Kabini Wildlife Reserve"
          description="A sanctuary where silence is broken only by a distant call. This set trails Kabini's secrets — elusive leopards, shadowy forests, and golden light pouring through ancient trees. Raw, untamed, and humbling."
          folder="wildlife/kabini"
          reverse={false}
        />

        <EventSection
          title="Birds"
          description="Feathers in motion. This series captures birds as brushstrokes in the sky — some in flight, some in stillness, each revealing nature’s palette and poise in quiet harmony."
          folder="wildlife/birds"
          reverse={true}
        />

        <EventSection
          title="Jim Corbett Wildlife Reserve"
          description="One of India's oldest and proudest reserves, Corbett echoes with heritage and wilderness. Misty mornings, elephant trails, and dense sal forests — a blend of power and peace told in visuals."
          folder="wildlife/corbett"
          reverse={false}
        />
      </div>
    </div>
  );
};

export default Wildlife;
