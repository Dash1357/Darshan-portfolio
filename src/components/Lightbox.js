import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import "./Lightbox.css";

export default function Lightbox({ items, folder, index, accent, onIndex, onClose }) {
  const touchX = useRef(null);
  const reduce = useReducedMotion();
  const item = items[index];
  const src = "/assets/" + folder + "/" + item.file;

  const step = useCallback(
    (d) => onIndex((index + d + items.length) % items.length),
    [index, items.length, onIndex]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [step, onClose]);

  // Preload the neighbouring photos so stepping feels instant.
  useEffect(() => {
    [1, -1].forEach((d) => {
      const n = items[(index + d + items.length) % items.length];
      if (n && n.type !== "video") {
        const img = new Image();
        img.src = "/assets/" + folder + "/" + n.file;
      }
    });
  }, [index, items, folder]);

  const pad = (n) => String(n + 1).padStart(2, "0");

  // Portal straight to <body> — a transformed ancestor (e.g. the page-
  // transition wrapper) would otherwise turn this fixed-position overlay
  // into one relative to that ancestor's box instead of the viewport.
  return createPortal(
    <motion.div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => { if (e.target.classList.contains("lb")) onClose(); }}
      onTouchStart={(e) => { touchX.current = e.changedTouches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48) step(dx > 0 ? -1 : 1);
        touchX.current = null;
      }}
    >
      <p className="lb-count">
        <b style={{ color: accent }}>{pad(index)}</b> / {String(items.length).padStart(2, "0")}
      </p>
      <button className="lb-x" onClick={onClose} aria-label="Close viewer">
        <svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
      <button className="lb-prev" onClick={() => step(-1)} aria-label="Previous">
        <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      {item.type === "video" ? (
        <motion.video
          key={src}
          src={src}
          controls
          autoPlay
          playsInline
          className="lb-media"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      ) : (
        <motion.img
          key={src}
          src={src}
          alt="Enlarged photograph"
          className="lb-media"
          initial={reduce ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      <button className="lb-next" onClick={() => step(1)} aria-label="Next">
        <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </motion.div>,
    document.body
  );
}
