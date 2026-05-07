import PictureButton from "./PictureButton";
import "./PictureGridSection.css";

function PictureGridSection({ title, items, sectionClassName }) {
  return (
    <section className={`pictureGridSection ${sectionClassName || ""}`}>
      <h2 className="pictureGridTitle">{title}</h2>

      <div className="pictureGrid">
        {items.map((item) => (
          <PictureButton
            key={item.id}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            caption={item.caption}
            onClick={item.onClick}
          />
        ))}
      </div>
    </section>
  );
}

export default PictureGridSection;
