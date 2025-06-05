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

      {/* 3D Model Section */}
      <section style={{ padding: '3rem 1rem' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          {/* Text Column */}
          <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '1rem' }}>
              DJI Mini 2 – Interactive 3D Model
            </h2>
            <p style={{ color: '#aaa', fontSize: '1rem', lineHeight: '1.6' }}>
              Explore the DJI Mini 2 from every angle. Rotate, zoom, and inspect the drone that powers my aerial vision.
              This interactive model gives you a close-up view of the tech that makes my aerial footage possible.
              I use this drone regularly during live football matches, travel shoots, and wildlife tracking — it's compact, reliable, and perfect for high-agility environments.
            </p>
          </div>

          {/* Iframe Column */}
          <div
            style={{
              flex: '1 1 500px',
              aspectRatio: '16 / 9',
              minHeight: '300px',
              maxWidth: '640px',
              borderRadius: '1rem',
              overflow: 'hidden',
              backgroundColor: '#111',
              boxShadow: '0 0 20px rgba(0,0,0,0.6)',
              position: 'relative',
            }}
          >
            <iframe
              title="DJI Mini 2 3D Model"
              src="https://sketchfab.com/models/85678e6bf8a74829984193fed2d025b5/embed"
              frameBorder="0"
              allow="autoplay; fullscreen; vr"
              mozAllowFullScreen
              webkitAllowFullScreen
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: '#111',
              }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* Event Sections */}
      <div className="max-w-6xl mx-auto px-4">
        <EventSection
          title="Shoots and Edits"
          description="High above rooftops and rivers, across coastlines and cityscapes, this gallery captures the language of flight. These edits bring together sweeping panoramas and purposeful transitions, each telling a story of motion, emotion, and perspective. This is where drone footage becomes more than documentation — it becomes direction."
          folder="drone/shoots"
          reverse={true}
        />
      </div>
    </div>
  );
};

export default Drone;