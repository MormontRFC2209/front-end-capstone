import react from "react";

export default function ThumbnailPhoto({ photoKey, columnId, photo, photoId, setPhotoId, trackingFunction }) {
  return (
    <div onClick={() => setPhotoId(columnId * 7 + photoKey)}>
      <img className="overview thumbnail-image" src={photo.thumbnail_url.split("&w=300&q=80").join("&w=100&q=40")} alt="thumbnail" onError={(e) => console.log(e)} onClick={trackingFunction}></img>
      {(columnId * 7 + photoKey) === photoId &&
        <div className="line-under-thumbnail"></div>
      }
      {(columnId * 7 + photoKey) !== photoId &&
        <div className="noline-under-thumbnail"></div>
      }
    </div>
  )
}