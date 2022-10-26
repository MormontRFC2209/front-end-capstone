import react from "react";
import ThumbnailStyle from "./ThumbnailStyle.jsx";

export default function ThumbnailRow({ rowKey, row, selectedStylePosition, clickStyle }) {
  const isSelected = (k) => {
    let currentSelected = false;
    if ((rowKey === selectedStylePosition.rowKey) && (k === selectedStylePosition.styleKey)) {
      currentSelected = true;
    }
    return currentSelected;
  };

  return (
    <div className="overview style-selector-row">
      {row.map((style, k) => {
        return (<ThumbnailStyle key={k} rowKey={rowKey} styleKey={k} style={style} currentSelected={isSelected(k)} clickStyle={clickStyle}/>)
      })}
    </div>
  )
}