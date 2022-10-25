import { useState, useEffect } from "react";
import ThumbnailPhoto from "./ThumbnailPhoto.jsx";
import ExpandedImageGallery from "./ExpandedImageGallery.jsx";
import UpArrow from "./UpArrow.jsx";
import DownArrow from "./DownArrow.jsx";
import BackArrow from "./BackArrow.jsx";
import ForwardArrow from "./ForwardArrow.jsx";

export default function DefaultImageGallery({ styles, selectedStyleId, trackingFunction }) {
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

  const handleBackArrowClick = (e) => {
    setPhotoId(photoId - 1);
    if (photoId % 7 === 0) {
      setColumnId(columnId - 1);
    }
    trackingFunction(e);
  };

  const handleForwardArrowClick = (e) => {
    setPhotoId(photoId + 1);
    if (photoId % 7 === 6) {
      setColumnId(columnId + 1);
    }
    trackingFunction(e);
  };

  const handleDownArrowClick = (e) => {
    setColumnId(columnId + 1);
    setPhotoId((columnId + 1) * 7);
    trackingFunction(e);
  };

  const handleUpArrowClick = (e) => {
    setColumnId(columnId - 1);
    setPhotoId((columnId - 1) * 7);
    trackingFunction(e);
  };

  const handleExpandClick = (e) => {
    setExpanded(true);
    trackingFunction(e);
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
        <ExpandedImageGallery photos={photos} photoId={photoId} expanded={expanded} setExpanded={setExpanded} setPhotoId={setPhotoId} handleBackArrowClick={handleBackArrowClick} handleForwardArrowClick={handleForwardArrowClick} trackingFunction={trackingFunction}/>
      }
      <img id="main-image" className="overview" src={photos[photoId].url} alt={styles[selectedStyleId].name} onClick={trackingFunction}></img>
      <div id="thumbnail-image-view">
        {columnId !== 0 &&
          <UpArrow handleUpArrowClick={handleUpArrowClick}/>
        }
        {columnId === 0 &&
          <div id="arrow-placeholder"></div>
        }
        {columns[columnId].map((photo, k) => {
          return (<ThumbnailPhoto key={k} photoKey={k} columnId={columnId} photo={photo} photoId={photoId} setPhotoId={setPhotoId} trackingFunction={trackingFunction}/>)
        })}
        {columnId !== (columnsOfThumbnails - 1) &&
          <DownArrow handleDownArrowClick={handleDownArrowClick}/>
        }
      </div>
      {photoId !== 0 &&
        <BackArrow expanded={expanded} handleBackArrowClick={handleBackArrowClick}/>
      }
      {photoId !== (photos.length - 1) &&
        <ForwardArrow expanded={expanded} handleForwardArrowClick={handleForwardArrowClick}/>
      }
      <div id="expand-icon-container" className="overview" onClick={handleExpandClick}>
        <i className="overview fa-solid fa-expand expand-icon"></i>
      </div>
    </div>
  );
};