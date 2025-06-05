import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import EventSection from '../components/EventSection';

const Sports = () => {
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
        <span>Sports</span>
        <span>Gallery</span>
      </div>

      {/* Event Sections */}
      <div className="max-w-6xl mx-auto px-4">
        <EventSection
          title="Indian Formula 4 Weekend – Chennai Street Circuit"
          description="A high-octane spectacle where speed meets strategy. Set against the gritty backdrop of Chennai's urban circuit, this series captures the raw thrill of India's Formula 4 showdown — sweeping corners, fierce duels, and moments that blur the line between chaos and control."
          folder="sports/f4-weekend"
          reverse={false}
        />

        <EventSection
          title="Bengaluru Karting Cup"
          description="From screeching tires to flying rubber, this event brings karting’s underground adrenaline to light. Young racers, sharp turns, and explosive starts define the pulse of this collection — an homage to the beginning of every racer's journey."
          folder="sports/karting"
          reverse={true}
        />

        <EventSection
          title="Bengaluru FC Edits"
          description="More than a game — this edit series reflects the soul of Bengaluru FC. Moments of celebration, grit, and collective pride stitched into visual rhythms. Where emotion meets motion and the beautiful game becomes visual poetry."
          folder="sports/bfc"
          reverse={false}
        />
      </div>
    </div>
  );
};

export default Sports;
