import react from 'react';

export default function DownArrow({ handleDownArrowClick }) {
  return (
    <div className="down-arrow-container" onClick={handleDownArrowClick}>
      <i className="fa-solid fa-angle-down arrow-icon"></i>
    </div>
  );
};