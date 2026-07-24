import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { CATEGORIES, SITE, HOME } from "../content/site";
import Reveal from "../components/Reveal";
import "./Home.css";

export default function Home() {
  const reduce = useReducedMotion();

  const nameLetters = useMemo(() => SITE.name.split(""), []);

  return (
    <main>
      {/* ---- cinematic hero ---- */}
      <header className="hero">
        {reduce ? (
          <img className="hero-bg" src={HOME.heroPoster} alt="" />
        ) : (
          <video
            className="hero-bg"
            src={HOME.heroVideo}
            poster={HOME.heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        )}
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-inner">
          <div>
            <p className="label">{SITE.role}</p>
            <h1>
              {!reduce ? (
                <span className="letter-reveal" aria-label={SITE.name}>
                  {nameLetters.map((ch, i) => (
                    <motion.span
                      key={i}
                      className="letter"
                      aria-hidden="true"
                      initial={{ opacity: 0, y: "0.6em" }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.035 }}
                    >
                      {ch === " " ? " " : ch}
                    </motion.span>
                  ))}
                </span>
              ) : (
                SITE.name
              )}
            </h1>
            {HOME.manifesto && (
              <motion.p
                className="hero-manifesto"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : 0.9 }}
              >
                {HOME.manifesto}
              </motion.p>
            )}
            <p className="label hero-sub">{SITE.location} — {SITE.tagline.toLowerCase()}</p>
          </div>
          <a className="scrollcue" href="#work" aria-label="Scroll to work">
            <span>Work</span>
            <i aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* ---- category grid: the one home of the four categories ---- */}
      <section className="cats" id="work" aria-label="Portfolio categories">
        {CATEGORIES.map((c, i) => (
          <Link
            key={c.slug}
            className="cat"
            to={"/" + c.slug}
            style={{ "--c": c.color, "--chi": c.colorHi }}
          >
            <img src={c.tile} alt={c.name + " photography by " + SITE.name} loading={i < 2 ? "eager" : "lazy"} />
            <span className="cat-tag">
              <span className="no">{String(i + 1).padStart(2, "0")}</span>
              <span className="nm">{c.name}</span>
            </span>
          </Link>
        ))}
      </section>

      {/* ---- one-line invitation above the footer ---- */}
      <section className="home-cta">
        <Reveal>
          <p className="home-cta-line">
            Have a race, a brand, or a story that needs shooting?{" "}
            <a href={"mailto:" + SITE.email}>Let's talk.</a>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
