import React, { useState, useEffect } from 'react';
import './Gallery.css';

const Gallery = ({ folder }) => {
  const mediaCount = 50;
  const [loadedMedia, setLoadedMedia] = useState([]);
  const extensions = ['jpg', 'jpeg', 'mp4'];

  const handleError = (file) => {
    setLoadedMedia((prev) => prev.filter((f) => f !== file));
  };

  useEffect(() => {
    const allMedia = [];
    for (let i = 1; i <= mediaCount; i++) {
      for (const ext of extensions) {
        const fileName = `${folder}_${String(i).padStart(2, '0')}.${ext}`;
        allMedia.push(`/assets/${folder}/${fileName}`);
      }
    }
    setLoadedMedia(allMedia);
  }, [folder]);

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {loadedMedia.map((file, idx) => {
          const ext = file.split('.').pop().toLowerCase();
          return (
            <div key={idx} className="tile-wrapper">
              {ext === 'mp4' ? (
                <video
                  src={file}
                  controls
                  preload="metadata"
                  className="tile-media"
                  onError={() => handleError(file)}
                />
              ) : (
                <img
                  src={file}
                  alt={`media-${idx}`}
                  loading="lazy"
                  className="tile-media"
                  onError={() => handleError(file)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
