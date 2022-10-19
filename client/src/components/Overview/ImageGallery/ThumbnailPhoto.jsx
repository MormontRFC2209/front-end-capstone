import react from 'react';

export default function ThumbnailPhoto({ photoKey, columnId, photo, photoId, setPhotoId }) {
  return (
    <div className='thumbnail-image-container' onClick={() => setPhotoId(columnId * 7 + photoKey)}>
      <img className='thumbnail-image' src={photo.thumbnail_url} alt={photo.thumbnail_url}></img>
      {(columnId * 7 + photoKey) === photoId &&
        <div className='line-under-thumbnail'></div>
      }
      {(columnId * 7 + photoKey) !== photoId &&
        <div className='noline-under-thumbnail'></div>
      }
    </div>
  )
}