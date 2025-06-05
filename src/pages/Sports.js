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
          description="A high-octane spectacle where speed meets strategy and nerves are tested to their limits. Set against the gritty, sun-scorched backdrop of Chennai’s urban maze, this series captures the raw electricity of India’s premier Formula 4 showdown. Screaming engines echo through tight corners, while drivers thread their way through chaos and control with split-second precision. It’s not just a race — it’s choreography on asphalt, where every turn risks glory or gravel."
          folder="sports/f4-weekend"
          reverse={false}
        />

        <EventSection
          title="Bengaluru Karting Cup"
          description="Before the grand circuits and roaring crowds, this is where it all begins — the raw, unfiltered world of karting. The Bengaluru Karting Cup dives deep into the adrenaline-fueled chaos of young racers carving their legacy one lap at a time. With screeching tires, unpredictable overtakes, and a crowd buzzing with grassroots energy, this series is an ode to racing's most honest form."
          folder="sports/karting"
          reverse={true}
        />

        <EventSection
          title="Bengaluru FC Edits"
          description="This isn't just a football club — it’s a movement. In this emotional edit series, we go beyond goals and glory to capture the heartbeats of Bengaluru FC. From tunnel walks and pre-match rituals to last-minute tackles and euphoric celebrations, this story unfolds in fragments of passion. With a cinematic lens, we chronicle a journey of grit, loyalty, and the unbreakable bond between a team and its people."
          folder="sports/bfc"
          reverse={false}
        />
      </div>
    </div>
  );
};

export default Sports;
