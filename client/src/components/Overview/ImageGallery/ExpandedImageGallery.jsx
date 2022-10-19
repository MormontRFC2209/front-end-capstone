import { useState, useEffect } from 'react';

export default function ExpandedImageGallery({ styles, selectedStyleId, expanded, setExpanded }) {
  return (
    <div> Expanded Image Gallery
      <button onClick={() => setExpanded(false)}>Click to Return To Default</button>
    </div>
  );
};