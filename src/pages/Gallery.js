import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bySlug, SITE } from "../content/site";
import manifest from "../content/manifest.json";
import MasonryGrid from "../components/MasonryGrid";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";
import NotFound from "./NotFound";
import "./Gallery.css";

export default function Gallery() {
  const { category } = useParams();
  const cat = bySlug(category);
  const [box, setBox] = useState(null); // { series: idx, item: idx }

  useEffect(() => {
    if (cat) document.title = cat.name + " — " + SITE.name;
  }, [cat]);

  if (!cat) return <NotFound />;

  const sections = cat.series
    .map((s) => ({ ...s, items: manifest[s.folder] || [] }))
    .filter((s) => s.items.length > 0);

  return (
    <main className="gal" style={{ "--c": cat.color, "--chi": cat.colorHi }}>
      <header className="gal-head">
        <Reveal><p className="label">Portfolio</p></Reveal>
        <Reveal delay={0.05}><h1>{cat.name}</h1></Reveal>
        <Reveal delay={0.1}><div className="rule" /></Reveal>
        <Reveal delay={0.15}><p className="gal-blurb">{cat.blurb}</p></Reveal>
      </header>

      {sections.map((s, si) => (
        <section className="series" key={s.folder}>
          <Reveal>
            <div className="series-rule">
              <span className="series-no">{String(si + 1).padStart(2, "0")}</span>
              <span className="series-line" />
            </div>
            <div className="series-head">
              <h2>{s.title}</h2>
              <span className="label">
                {s.items.length} {s.items.length === 1 ? "frame" : "frames"}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="series-desc">{s.description}</p>
          </Reveal>
          <MasonryGrid
            items={s.items}
            folder={s.folder}
            seriesTitle={s.title}
            onOpen={(i) => setBox({ series: si, item: i })}
          />
        </section>
      ))}

      {cat.sketchfab && (
        <section className="series">
          <Reveal>
            <div className="series-head">
              <h2>The machine behind the frames</h2>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="embed-3d">
              <iframe
                title="3D drone model"
                src={cat.sketchfab}
                frameBorder="0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
              />
            </div>
          </Reveal>
        </section>
      )}

      {box !== null && (
        <Lightbox
          items={sections[box.series].items}
          folder={sections[box.series].folder}
          index={box.item}
          accent={cat.colorHi}
          onIndex={(i) => setBox({ ...box, item: i })}
          onClose={() => setBox(null)}
        />
      )}
    </main>
  );
}
