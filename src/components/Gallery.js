import React, { useState } from 'react';

const Gallery = ({ folder, title }) => {
  const mediaCount = 50;
  const [loadedMedia, setLoadedMedia] = useState([]);

  const extensions = ['jpg', 'jpeg', 'mp4'];

  const handleError = (file) => {
    setLoadedMedia((prev) => prev.filter((f) => f !== file));
  };

  // Generate media paths
  const allMedia = [];
  for (let i = 1; i <= mediaCount; i++) {
    for (const ext of extensions) {
      const fileName = `${folder}_${String(i).padStart(2, '0')}.${ext}`;
      allMedia.push(`/assets/${folder}/${fileName}`);
    }
  }

  // Filter once: on first render or refetch
  React.useEffect(() => {
    setLoadedMedia(allMedia);
  }, [folder]);

  return (
    <div style={{ padding: '2rem', background: '#111', color: 'white', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>{title} Gallery</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {loadedMedia.map((file, idx) => {
          const ext = file.split('.').pop().toLowerCase();

          return ext === 'mp4' ? (
            <video
              key={idx}
              src={file}
              controls
              preload="metadata"
              style={{
                width: '100%',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
              onError={() => handleError(file)}
            />
          ) : (
            <img
              key={idx}
              src={file}
              alt={`media-${idx}`}
              style={{
                width: '100%',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
              onError={() => handleError(file)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
