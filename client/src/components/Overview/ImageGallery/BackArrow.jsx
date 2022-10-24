import react from 'react';

export default function BackArrow({ expanded, handleBackArrowClick }) {
  const backArrowClassName = expanded ? 'expanded-thumbnail-shadow' : 'backward-arrow-container';

  return (
    <div className={backArrowClassName} onClick={handleBackArrowClick}>
      <i className="fa-solid fa-arrow-left" ></i>
    </div>
  );
};