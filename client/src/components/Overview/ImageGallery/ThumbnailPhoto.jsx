import react from "react";

export default function ThumbnailPhoto({ photoKey, columnId, photo, photoId, setPhotoId }) {
  return (
    <div onClick={() => setPhotoId(columnId * 7 + photoKey)}>
      <img className="overview thumbnail-image" src={photo.thumbnail_url} alt={photo.thumbnail_url}></img>
      {(columnId * 7 + photoKey) === photoId &&
        <div className="overview line-under-thumbnail"></div>
      }
      {(columnId * 7 + photoKey) !== photoId &&
        <div className="overview noline-under-thumbnail"></div>
      }
    </div>
  )
}