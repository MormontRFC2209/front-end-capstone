import react from 'react';

export default function ForwardArrow({ expanded, handleForwardArrowClick }) {
  const forwardArrowClassName = expanded ? 'expanded-thumbnail-shadow' : 'forward-arrow-container';

  return (
    <div className={forwardArrowClassName} onClick={handleForwardArrowClick}>
      <i className="fa-solid fa-arrow-right"></i>
    </div>
  );
};