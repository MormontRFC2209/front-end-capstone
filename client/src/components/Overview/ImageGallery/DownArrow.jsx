import react from "react";

export default function DownArrow({ handleDownArrowClick }) {
  return (
    <div id="down-arrow-container" className="overview" onClick={handleDownArrowClick}>
      <i className="overview fa-solid fa-angle-down arrow-icon"></i>
    </div>
  );
};