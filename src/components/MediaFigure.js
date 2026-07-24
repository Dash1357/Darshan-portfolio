import { useState } from "react";

/* One tile in a gallery grid — image or video, native aspect ratio. */
export default function MediaFigure({ item, src, onClick, alt }) {
  const [loaded, setLoaded] = useState(false);
  const ratio = item.w && item.h ? item.w + " / " + item.h : "3 / 2";

  return (
    <figure
      className={"mfig" + (loaded ? " loaded" : "")}
      style={{ aspectRatio: ratio }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={"Open " + (item.type === "video" ? "video" : "photograph") + " fullscreen"}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
    >
      {item.type === "video" ? (
        <>
          <video src={src} muted playsInline preload="metadata" onLoadedData={() => setLoaded(true)} />
          <span className="mfig-play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </>
      ) : (
        <img src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(true)} />
      )}
    </figure>
  );
}
