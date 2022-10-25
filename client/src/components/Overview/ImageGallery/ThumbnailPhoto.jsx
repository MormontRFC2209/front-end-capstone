import react from "react";

export default function ThumbnailPhoto({ photoKey, columnId, photo, photoId, setPhotoId, trackingFunction }) {
  return (
    <div onClick={() => setPhotoId(columnId * 7 + photoKey)}>
      <img className="overview thumbnail-image" src={photo.thumbnail_url} alt={photo.thumbnail_url} onClick={trackingFunction}></img>
      {(columnId * 7 + photoKey) === photoId &&
        <div className="line-under-thumbnail"></div>
      }
      {(columnId * 7 + photoKey) !== photoId &&
        <div className="noline-under-thumbnail"></div>
      }
    </div>
  )
}