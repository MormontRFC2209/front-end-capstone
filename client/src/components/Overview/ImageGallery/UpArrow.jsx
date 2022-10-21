import react from 'react';

export default function UpArrow({ handleUpArrowClick }) {
  return (
    <div className="up-arrow-container" onClick={handleUpArrowClick}>
      <i className="fa-solid fa-angle-up arrow-icon"></i>
    </div>
  );
};