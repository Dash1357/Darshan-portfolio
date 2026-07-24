import { useEffect } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

export default function NotFound() {
  useEffect(() => { document.title = "Page not found — Darshan Jhawar"; }, []);
  return (
    <main style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "18px", padding: "0 var(--gut)", textAlign: "center" }}>
      <Reveal>
        <p className="label">404</p>
        <h1 style={{ fontFamily: "var(--disp)", fontWeight: 400, fontSize: "clamp(2rem,6vw,3.6rem)" }}>This frame doesn't exist.</h1>
        <Link to="/" className="label" style={{ borderBottom: "1px solid var(--red)", paddingBottom: "3px" }}>Back to the portfolio</Link>
      </Reveal>
    </main>
  );
}
