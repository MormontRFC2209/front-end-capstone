import { useState, useEffect } from 'react';

export default function ThumbnailStyle({ rowKey, styleKey, style, currentSelected, clickStyle }) {
  const [selected, setSelected] = useState(currentSelected);

  useEffect(() => {
    setSelected(currentSelected);
  }, [currentSelected]);

  return (
    <div className='thumbnail-block' onClick={() => clickStyle(rowKey, styleKey)}>
      <img className='thumbnail' src={style.photos[0].thumbnail_url} alt={style.name}></img>
      {selected &&
        <i className="fa-solid fa-circle-check fa-lg icon-tag"></i>
      }
    </div>
  )
}