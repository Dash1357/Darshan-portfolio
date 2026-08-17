import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "./Nav";
import { CATEGORIES } from "../content/site";
import { ROUTER_FUTURE } from "../routerFuture";

/*
 * Two behaviours are pinned here.
 *
 * 1. "Categories appear in exactly ONE place per screen" is a stated design
 *    rule: the tile grid owns them on home, the nav bar owns them on inner
 *    pages. Rendering both is a design regression that still looks fine to a
 *    smoke test.
 * 2. On mobile the nav strip scrolls horizontally (five categories don't fit)
 *    and scrolls the active link into view. That runs a second time on
 *    document.fonts.ready, because the first pass can fire before Familjen
 *    Grotesk reflows link widths and lands short.
 *
 * jsdom has no layout, so the horizontal overflow itself is a browser check
 * (/qa). What is testable here is that the scroll is requested, and requested
 * again after fonts settle.
 */

function renderAt(pathname) {
  return render(
    <MemoryRouter initialEntries={[pathname]} future={ROUTER_FUTURE}>
      <Nav />
    </MemoryRouter>
  );
}

let scrollIntoView;

beforeEach(() => {
  // jsdom does not implement scrollIntoView; without this the effect throws.
  scrollIntoView = jest.fn();
  Element.prototype.scrollIntoView = scrollIntoView;
});

afterEach(() => {
  delete document.fonts;
});

describe("home", () => {
  it("shows only Contact, leaving categories to the tile grid", () => {
    renderAt("/");
    expect(screen.getByText("Contact")).toBeInTheDocument();
    CATEGORIES.forEach((c) => {
      expect(screen.queryByRole("link", { name: c.name })).toBeNull();
    });
  });

  it("does not try to scroll anything into view", () => {
    renderAt("/");
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});

describe("inner pages", () => {
  it("carries every category link", () => {
    renderAt("/sports");
    CATEGORIES.forEach((c) => {
      expect(screen.getByRole("link", { name: c.name })).toHaveAttribute(
        "href",
        "/" + c.slug
      );
    });
  });

  it("drops the home-only Contact link", () => {
    renderAt("/sports");
    expect(screen.queryByText("Contact")).toBeNull();
  });

  it.each(CATEGORIES.map((c) => [c.slug, c.name]))(
    "marks %s as the current page",
    (slug, name) => {
      renderAt("/" + slug);
      expect(screen.getByRole("link", { name })).toHaveAttribute(
        "aria-current",
        "page"
      );
    }
  );

  it("marks exactly one link as current", () => {
    const { container } = renderAt("/travel");
    expect(container.querySelectorAll('a[aria-current="page"]')).toHaveLength(1);
  });

  it("scrolls the active link into view", () => {
    renderAt("/pixelstretch");
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it("scrolls again once web fonts are ready", async () => {
    // The documented fix: a font swap reflows link widths, so an early scroll
    // undershoots. Drop this .then() and the last category can sit off-screen
    // on a phone.
    document.fonts = { ready: Promise.resolve() };
    renderAt("/pixelstretch");

    const initialCalls = scrollIntoView.mock.calls.length;
    expect(initialCalls).toBeGreaterThan(0);
    await waitFor(() =>
      expect(scrollIntoView.mock.calls.length).toBeGreaterThan(initialCalls)
    );
  });

  it("survives a missing document.fonts", () => {
    // Optional chaining guards older browsers; this pins that it stays.
    delete document.fonts;
    expect(() => renderAt("/drone")).not.toThrow();
  });
});

describe("masthead", () => {
  it("always links home", () => {
    renderAt("/sports");
    const mark = screen.getByRole("link", { name: /home$/i });
    expect(mark).toHaveAttribute("href", "/");
  });
});
