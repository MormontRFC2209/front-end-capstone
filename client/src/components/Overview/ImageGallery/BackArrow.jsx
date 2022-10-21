import react from 'react';

export default function BackArrow({ handleBackArrowClick }) {
  return (
    <div className="backward-arrow-container" onClick={handleBackArrowClick}>
      <i className="fa-solid fa-arrow-left backward-arrow" ></i>
    </div>
  );
};