import "./PictureButton.css";

function PictureButton({ imageSrc, imageAlt, caption, onClick }) {
  return (
    <button className="pictureButton" onClick={onClick}>
      <img src={imageSrc} alt={imageAlt} className="pictureButtonImage" />

      {caption && (
        <span className="pictureButtonCaption">
          {caption}
        </span>
      )}
    </button>
  );
}

export default PictureButton;