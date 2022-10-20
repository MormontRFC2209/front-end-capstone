import { useState, useEffect } from 'react';

export default function ExpandedImageGallery({ photos, photoId, expanded, setExpanded }) {
  return (
    <div className='expanded-image'> Expanded Image Gallery
      <section className='expanded-image-main'>
        <img className='expanded-main-image' src={photos[photoId].url} alt='expanded main image'></img>
        <button onClick={() => setExpanded(false)}>Click to Return To Default</button>
      </section>
    </div>
  );
};