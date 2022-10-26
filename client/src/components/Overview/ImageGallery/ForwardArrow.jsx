import react from "react";

export default function ForwardArrow({ expanded, handleForwardArrowClick }) {
  const forwardArrowClassName = expanded ? "expanded-thumbnail-shadow" : "forward-arrow-container";

  return (
    <div className={`overview ${forwardArrowClassName}`} onClick={handleForwardArrowClick}>
      <i className="overview fa-solid fa-arrow-right"></i>
    </div>
  );
};