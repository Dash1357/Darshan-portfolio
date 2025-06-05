import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import EventSection from '../components/EventSection';

const Drone = () => {
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
        <span>Drone</span>
        <span>Gallery</span>
      </div>

      {/* Events */}
      <div className="max-w-6xl mx-auto px-4">
        <EventSection
          title="My Drone – DJI Mini 2"
          description="Compact yet powerful, the DJI Mini 2 is the lens through which I view the world from above. This segment showcases its design, flight capability, and cinematic agility — the tool behind the magic."
          folder="drone/model"
          reverse={false}
        />

        <EventSection
          title="Shoots and Edits"
          description="Elevated perspectives stitched into visual stories. From sweeping landscapes to curated transitions, these drone shots capture more than scenes — they capture moods, movement, and meaning from a bird’s eye view."
          folder="drone/shoots"
          reverse={true}
        />
      </div>
    </div>
  );
};

export default Drone;
