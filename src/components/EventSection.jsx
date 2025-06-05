import React from 'react';
import MediaSlider from './MediaSlider';

const EventSection = ({ title, description, folder, reverse }) => {
  return (
    <section
      className={`event-section ${reverse ? 'reverse' : ''}`}
      style={{
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        padding: '3rem 1rem',
        flexWrap: 'wrap',
      }}
    >
      <div className="event-description" style={{ flex: 1, minWidth: '300px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{title}</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>{description}</p>
      </div>
      <div className="event-slider" style={{ flex: 1, minWidth: '300px' }}>
        <MediaSlider folder={folder} />
      </div>
    </section>
  );
};

export default EventSection;
