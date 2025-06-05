import React, { useRef, useState, useEffect, useImperativeHandle } from 'react';
import Slider from 'react-slick';
import './MediaSlider.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MediaSlider = ({ folder }) => {
  const baseName = folder.split('/').pop();
  const [media, setMedia] = useState([]);
  const sliderRef = useRef(null);
  const videoRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadMedia = async () => {
      const results = [];
      let index = 1;
      let missCount = 0;

      while (missCount < 5 && index <= 100) {
        const padded = String(index).padStart(2, '0');
        const formats = [
          { type: 'video', ext: 'webm' },
          { type: 'video', ext: 'mp4' },
          { type: 'image', ext: 'webp' }
        ];

        let found = false;
        for (const { type, ext } of formats) {
          const path = `/assets/${folder}/${baseName}_${padded}.${ext}`;
          try {
            const res = await fetch(path, { method: 'HEAD' });
            if (res.ok && res.headers.get("Content-Type")?.includes(type === 'video' ? 'video' : 'image')) {
              results.push({ type, src: path });
              found = true;
              break;
            }
          } catch {}
        }

        missCount = found ? 0 : missCount + 1;
        index++;
      }

      setMedia(results);
    };

    loadMedia();
  }, [folder, baseName]);

  useEffect(() => {
    const slider = sliderRef.current?.innerSlider?.list;
    if (!slider) return;

    let startX = 0;
    let endX = 0;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const onTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
      if (startX - endX > 50) sliderRef.current.slickNext();
      else if (endX - startX > 50) sliderRef.current.slickPrev();
    };

    slider.addEventListener('touchstart', onTouchStart);
    slider.addEventListener('touchmove', onTouchMove);
    slider.addEventListener('touchend', onTouchEnd);

    return () => {
      slider.removeEventListener('touchstart', onTouchStart);
      slider.removeEventListener('touchmove', onTouchMove);
      slider.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    cssEase: "ease-in-out",
    beforeChange: (oldIndex, newIndex) => {
      videoRefs.current.forEach((video, i) => {
        if (video && i !== newIndex) {
          video.pause();
          video.currentTime = 0;
        }
      });
      setCurrentSlide(newIndex);
    },
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />,
  };

  if (media.length === 0) {
    return <div className="text-center text-white p-8">No media found.</div>;
  }

  return (
    <Slider {...settings} ref={sliderRef} className="media-slider">
      {media.map((item, idx) => (
        <Slide
          key={idx}
          type={item.type}
          src={item.src}
          ref={(el) => (videoRefs.current[idx] = el)}
          isActive={idx === currentSlide}
        />
      ))}
    </Slider>
  );
};

const Slide = React.forwardRef(({ type, src, isActive }, ref) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useImperativeHandle(ref, () => videoRef.current);

  useEffect(() => {
    if (videoRef.current && type === 'video') {
      if (isActive) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, type]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  if (type === 'video') {
    return (
      <div className="video-container small-media-box">
        <video
          ref={videoRef}
          src={src}
          muted={muted}
          autoPlay
          loop
          playsInline
          preload="metadata"
          className="slider-media video-rounded"
        />
        <div className="video-controls">
          <button className="mute-toggle bottom-left" onClick={() => setMuted((prev) => !prev)}>
            {muted ? '🔇' : '🔊'}
          </button>
          <button className="play-toggle bottom-right" onClick={togglePlay}>
            {isPlaying ? '⏸' : '▶️'}
          </button>
        </div>
      </div>
    );
  } else if (type === 'image') {
    return (
      <div className="image-container small-media-box">
        <img
          src={src}
          alt="gallery"
          className="slider-media image-square"
          loading="lazy"
        />
      </div>
    );
  }

  return null;
});

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow right" onClick={onClick}>
    <ChevronRight size={22} strokeWidth={2} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow left" onClick={onClick}>
    <ChevronLeft size={22} strokeWidth={2} />
  </div>
);

export default MediaSlider;
