import React, { useState, useEffect } from 'react';
import './Gallery.css';

const Gallery = ({ folder }) => {
  const mediaCount = 50;
  const extensions = ['jpg', 'jpeg', 'mp4'];
  const [mediaFiles, setMediaFiles] = useState([]);

  useEffect(() => {
    const allFiles = [];
    for (let i = 1; i <= mediaCount; i++) {
      for (let ext of extensions) {
        const file = `/assets/${folder}/${folder}_${String(i).padStart(2, '0')}.${ext}`;
        allFiles.push(file);
      }
    }
    setMediaFiles(allFiles);
  }, [folder]);

  const handleError = (file) => {
    setMediaFiles((prev) => prev.filter((f) => f !== file));
  };

  return (
    <div className="gallery-wrapper">
      {/* Back Arrow (fixed to top-left) */}
      {/* Removed the gallery title rendering here */}
      <div className="gallery-grid">
        {mediaFiles.map((file, idx) => {
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
