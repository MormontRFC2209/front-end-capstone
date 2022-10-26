import react from "react";

export default function UpArrow({ handleUpArrowClick }) {
  return (
    <div id="up-arrow-container" className="overview" onClick={handleUpArrowClick}>
      <i className="overview fa-solid fa-angle-up arrow-icon"></i>
    </div>
  );
};