import react from 'react';

export default function ForwardArrow({ handleForwardArrowClick }) {
  return (
    <div className="forward-arrow-container" onClick={handleForwardArrowClick}>
      <i className="fa-solid fa-arrow-right forward-arrow"></i>
    </div>
  );
};