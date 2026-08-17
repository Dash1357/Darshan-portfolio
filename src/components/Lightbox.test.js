import { render, screen, fireEvent } from "@testing-library/react";
import Lightbox from "./Lightbox";

/*
 * Lightbox is the component CLAUDE.md flags as fragile, for two reasons that
 * are both invisible in a naive render:
 *   1. It MUST portal to document.body. PageTransition leaves a transform on an
 *      ancestor even at rest, which makes that ancestor the containing block
 *      for position:fixed. Without the portal the overlay stretches to the full
 *      document and centres itself far down the page - only reproducible if you
 *      scroll before opening, so easy to miss by hand.
 *   2. It must actually unmount on close. Exit animations have stuck in this
 *      project before, and a lightbox that never closes traps the whole page.
 *
 * Layout itself (the fixed overlay filling the viewport) needs a real layout
 * engine and is covered by /qa in a browser, not here - jsdom has no layout.
 */

const items = [
  { file: "one.webp", type: "image", w: 1600, h: 1000 },
  { file: "two.webp", type: "image", w: 1600, h: 1000 },
  { file: "three.mp4", type: "video", w: 608, h: 1080 },
];

function setup(overrides = {}) {
  const props = {
    items,
    folder: "sports/f4-weekend",
    index: 0,
    accent: "#C01818",
    onIndex: jest.fn(),
    onClose: jest.fn(),
    ...overrides,
  };
  const utils = render(<Lightbox {...props} />);
  return { ...utils, props };
}

describe("portal placement", () => {
  it("renders into document.body, not inside its parent tree", () => {
    // The regression guard. If someone drops the createPortal call this
    // assertion fails, long before anyone scrolls a gallery to notice.
    const { container } = setup();
    const overlay = document.body.querySelector(".lb");

    expect(overlay).toBeInTheDocument();
    expect(overlay.parentElement).toBe(document.body);
    expect(container.querySelector(".lb")).toBeNull();
  });

  it("exposes itself as a modal dialog", () => {
    setup();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleName("Media viewer");
  });
});

describe("closing", () => {
  it("closes on Escape", () => {
    const { props } = setup();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when the backdrop itself is clicked", () => {
    const { props } = setup();
    fireEvent.click(document.body.querySelector(".lb"));
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when the photo is clicked", () => {
    // Clicking the image must not dismiss - only the backdrop does.
    const { props } = setup();
    fireEvent.click(screen.getByAltText("Enlarged photograph"));
    expect(props.onClose).not.toHaveBeenCalled();
  });

  it("closes from the close button", () => {
    const { props } = setup();
    fireEvent.click(screen.getByLabelText("Close viewer"));
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("removes itself from the document on unmount", () => {
    const { unmount } = setup();
    expect(document.body.querySelector(".lb")).toBeInTheDocument();
    unmount();
    expect(document.body.querySelector(".lb")).toBeNull();
  });
});

describe("scroll lock", () => {
  it("locks body scroll while open and restores it on unmount", () => {
    const { unmount } = setup();
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    // A leaked "hidden" here would silently freeze the whole site.
    expect(document.body.style.overflow).toBe("");
  });
});

describe("stepping between items", () => {
  it("advances with ArrowRight", () => {
    const { props } = setup({ index: 0 });
    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(props.onIndex).toHaveBeenCalledWith(1);
  });

  it("goes back with ArrowLeft", () => {
    const { props } = setup({ index: 1 });
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(props.onIndex).toHaveBeenCalledWith(0);
  });

  it("wraps forward from the last item to the first", () => {
    const { props } = setup({ index: items.length - 1 });
    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(props.onIndex).toHaveBeenCalledWith(0);
  });

  it("wraps backward from the first item to the last", () => {
    // The modulo has a +items.length precisely so this doesn't go negative.
    const { props } = setup({ index: 0 });
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(props.onIndex).toHaveBeenCalledWith(items.length - 1);
  });

  it("steps from the prev/next buttons too", () => {
    const { props } = setup({ index: 0 });
    fireEvent.click(screen.getByLabelText("Next"));
    expect(props.onIndex).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByLabelText("Previous"));
    expect(props.onIndex).toHaveBeenCalledWith(items.length - 1);
  });

  it("ignores unrelated keys", () => {
    const { props } = setup();
    fireEvent.keyDown(document, { key: "a" });
    expect(props.onIndex).not.toHaveBeenCalled();
    expect(props.onClose).not.toHaveBeenCalled();
  });
});

describe("media type", () => {
  it("renders an image for image items, pointed at the folder", () => {
    setup({ index: 0 });
    expect(screen.getByAltText("Enlarged photograph")).toHaveAttribute(
      "src",
      "/assets/sports/f4-weekend/one.webp"
    );
  });

  it("renders a video element for video items", () => {
    const { container } = setup({ index: 2 });
    const video = document.body.querySelector("video.lb-media");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("src", "/assets/sports/f4-weekend/three.mp4");
    expect(container.querySelector("img.lb-media")).toBeNull();
  });
});

describe("counter", () => {
  it("shows a 1-based, zero-padded position", () => {
    setup({ index: 0 });
    expect(document.body.querySelector(".lb-count")).toHaveTextContent("01 / 03");
  });
});
