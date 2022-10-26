import { useState, useEffect } from "react";

export default function ThumbnailStyle({ rowKey, styleKey, style, currentSelected, clickStyle }) {
  const [selected, setSelected] = useState(currentSelected);

  useEffect(() => {
    setSelected(currentSelected);
  }, [currentSelected]);

  return (
    <div className="overview thumbnail-block" onClick={() => clickStyle(rowKey, styleKey)}>
      <img className="overview thumbnail" src={style.photos[0].thumbnail_url} alt={style.name}></img>
      {selected &&
        <i className="overview fa-solid fa-circle-check fa-lg icon-tag"></i>
      }
    </div>
  )
}