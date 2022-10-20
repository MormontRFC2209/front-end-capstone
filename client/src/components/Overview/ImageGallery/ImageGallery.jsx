import { useState, useEffect } from 'react';
import ThumbnailPhoto from './ThumbnailPhoto.jsx';
import ExpandedImageGallery from './ExpandedImageGallery.jsx';

export default function ImageGallery({ styles, selectedStyleId }) {
  const [expanded, setExpanded] = useState(false);
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
      setColumnId(0);
      setPhotos(styles[selectedStyleId].photos);
    }
  }, [selectedStyleId]);

  return (
    <div>
      {expanded &&
        <ExpandedImageGallery photos={photos} photoId={photoId} expanded={expanded} setExpanded={setExpanded}/>
      }
      <img className='main-image' src={photos[photoId].url} alt={styles[selectedStyleId].name}></img>
      <div className='thumbnail-image-view'>
        {columnId !== 0 &&
          <div className="up-arrow-container" onClick={handleUpArrowClick}>
            <i className="fa-solid fa-angle-up arrow-icon"></i>
          </div>
        }
        {columnId === 0 &&
          <div className='arrow-placeholder'></div>
        }
        {columns[columnId].map((photo, k) => {
          return (<ThumbnailPhoto key={k} photoKey={k} columnId={columnId} photo={photo} photoId={photoId} setPhotoId={setPhotoId}/>)
        })}
        {columnId !== (columnsOfThumbnails - 1) &&
          <div className="down-arrow-container" onClick={handleDownArrowClick}>
            <i className="fa-solid fa-angle-down arrow-icon"></i>
          </div>
        }
      </div>
      {photoId !== 0 &&
        <div className="backward-arrow-container" onClick={handleBackArrowClick}>
          <i className="fa-solid fa-arrow-left backward-arrow" ></i>
        </div>
      }
      {photoId !== (photos.length - 1) &&
        <div className="forward-arrow-container" onClick={handleForwardArrowClick}>
          <i className="fa-solid fa-arrow-right forward-arrow"></i>
        </div>
      }
      <div className="expand-icon-container" onClick={() => setExpanded(true)}>
        <i className="fa-solid fa-expand expand-icon"></i>
      </div>
    </div>
  );
};