import react from "react";

export default function BackArrow({ expanded, handleBackArrowClick }) {
  const backArrowClassName = expanded ? "expanded-thumbnail-shadow" : "backward-arrow-container";

  return (
    <div className={`overview ${backArrowClassName}`} onClick={handleBackArrowClick}>
      <i className="overview fa-solid fa-arrow-left" ></i>
    </div>
  );
};