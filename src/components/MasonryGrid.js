import MediaFigure from "./MediaFigure";
import Reveal from "./Reveal";
import "./MasonryGrid.css";

export default function MasonryGrid({ items, folder, seriesTitle, onOpen }) {
  return (
    <div className="masonry">
      {items.map((item, i) => (
        <Reveal key={item.file} className="masonry-item" delay={(i % 3) * 0.08}>
          <MediaFigure
            item={item}
            src={"/assets/" + folder + "/" + item.file}
            alt={seriesTitle + " — frame " + (i + 1) + " by Darshan Jhawar"}
            onClick={() => onOpen(i)}
          />
        </Reveal>
      ))}
    </div>
  );
}
