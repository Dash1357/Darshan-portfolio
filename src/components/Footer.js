import { SITE } from "../content/site";
import Reveal from "./Reveal";
import "./Footer.css";

export default function Footer() {
  return (
    <footer id="contact">
      <Reveal className="f-inner">
        <img src="/assets/home/logo.png" alt={SITE.name + " emblem"} />
        <p className="f-line">{SITE.tagline}</p>
        <div className="f-links">
          <a href={"mailto:" + SITE.email}>{SITE.email}</a>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
          <a href={SITE.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </Reveal>
      <div className="f-micro">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>{SITE.location}</span>
      </div>
    </footer>
  );
}
