import { useState, useEffect } from 'react';
import ThumbnailPhoto from './ThumbnailPhoto.jsx';

export default function ImageGallery({ styles, selectedStyleId }) {
  const [photos, setPhotos] = useState(styles[selectedStyleId].photos);
  const [columnId, setColumnId] = useState(0);
  const [photoId, setPhotoId] = useState(0);

  let columnsOfThumbnails = Math.ceil(photos.length/7);
  let columns = [];
  for (let j = 0; j < columnsOfThumbnails; j++) {
    let photosOfColumn = photos.slice((j * 7), ((j + 1) * 7));
    columns.push(photosOfColumn);
  }

  const handleBackArrowClick = () => {
    setPhotoId(photoId - 1);
    if (photoId % 7 === 0) {
      setColumnId(columnId - 1);
    }
  };

  const handleForwardArrowClick = () => {
    setPhotoId(photoId + 1);
    if (photoId % 7 === 6) {
      setColumnId(columnId + 1);
    }
  };

  const handleDownArrowClick = () => {
    setColumnId(columnId + 1);
    setPhotoId((columnId + 1) * 7);
  };

  const handleUpArrowClick = () => {
    setColumnId(columnId - 1);
    setPhotoId((columnId - 1) * 7);
  };

  useEffect(() => {
    if (styles[selectedStyleId].photos[photoId]) {
      setPhotos(styles[selectedStyleId].photos);
    } else {
      setPhotoId(0);
      setPhotos(styles[selectedStyleId].photos);
    }
  }, [selectedStyleId]);

  return (
    <div>
      <img className='main-image' src={photos[photoId].url} alt={styles[selectedStyleId].name}></img>
      <div className='thumbnail-image-view'>
        {columnId !== 0 &&
          <i className="fa-solid fa-angle-up arrow-icon" onClick={handleUpArrowClick}></i>
        }
        {columnId === 0 &&
          <div className='arrow-placeholder'></div>
        }
        {columns[columnId].map((photo, k) => {
          return (<ThumbnailPhoto key={k} photoKey={k} columnId={columnId} photo={photo} photoId={photoId} setPhotoId={setPhotoId}/>)
        })}
        {columnId !== (columnsOfThumbnails - 1) &&
          <i className="fa-solid fa-angle-down arrow-icon" onClick={handleDownArrowClick}></i>
        }
      </div>
      {photoId !== 0 &&
        <i className="fa-solid fa-arrow-left backward-arrow" onClick={handleBackArrowClick}></i>
      }
      {photoId !== (photos.length - 1) &&
        <i className="fa-solid fa-arrow-right forward-arrow" onClick={handleForwardArrowClick}></i>
      }
    </div>
  );
};