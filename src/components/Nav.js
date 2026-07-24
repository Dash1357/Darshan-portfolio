import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CATEGORIES, SITE } from "../content/site";
import "./Nav.css";

/*
 * Categories live in exactly one place per screen:
 * on the homepage they are the tile grid, so the bar shows only Contact;
 * on inner pages the bar carries the category links.
 */
export default function Nav() {
  const { pathname } = useLocation();
  const home = pathname === "/";
  const linksRef = useRef(null);

  // On narrow screens the nav strip scrolls horizontally — keep the
  // active category link in view instead of leaving it off-screen. Runs
  // again once web fonts finish loading, since font swap reflows link
  // widths and can leave an early scroll short of the mark.
  useEffect(() => {
    if (home || !linksRef.current) return;
    const scrollActiveIntoView = () => {
      const active = linksRef.current?.querySelector('a[aria-current="page"]');
      if (active) active.scrollIntoView({ block: "nearest", inline: "nearest" });
    };
    scrollActiveIntoView();
    document.fonts?.ready.then(scrollActiveIntoView);
  }, [pathname, home]);

  return (
    <nav className="nav">
      <Link className="nav-mark" to="/" aria-label={SITE.name + " — home"}>
        <img src="/assets/home/logo.png" alt="" width="30" height="22" />
        <span>{SITE.name}</span>
      </Link>

      {home ? (
        <div className="nav-links" key="home">
          <a href="#contact">Contact</a>
        </div>
      ) : (
        <div className="nav-links" key="inner" ref={linksRef}>
          {CATEGORIES.map((c) => (
            <NavLink
              key={c.slug}
              to={"/" + c.slug}
              style={({ isActive }) => ({
                "--hi": c.colorHi,
                borderBottomColor: isActive ? c.color : "transparent",
              })}
            >
              {c.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
