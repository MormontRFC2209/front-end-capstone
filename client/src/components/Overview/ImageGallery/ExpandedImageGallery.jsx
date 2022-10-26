import { useState, useEffect } from "react";
import BackArrow from "./BackArrow.jsx";
import ForwardArrow from "./ForwardArrow.jsx";

export default function ExpandedImageGallery({ photos, photoId, expanded, setExpanded, setPhotoId, handleBackArrowClick, handleForwardArrowClick, trackingFunction }) {
  const [zoom, setZoom] = useState(false);
  const [expandedDimensions, setExpandedDimensions] = useState([0, 0]);
  const [zoomSize, setZoomSize] = useState("");

  const handleCloseClick = (e) => {
    setExpanded(false);
    trackingFunction(e);
  };

  const handleZoomCloseClick = (e) => {
    setZoom(false);
    trackingFunction(e);
  };

  const handleZoomOpenClick = (e) => {
    setZoom(true);
    setExpandedDimensions([e.clientX/e.currentTarget.clientWidth*100, e.clientY/e.currentTarget.clientHeight*100]);
    if (e.currentTarget.clientWidth >= e.currentTarget.clientHeight) {
      setZoomSize(`${e.currentTarget.clientWidth * 2.5}px auto`);
    } else {
      setZoomSize(`auto ${e.currentTarget.clientHeight * 2.5}px`);
    }
    trackingFunction(e);
  };

  const zoomIn = (e) => {
    const zoomTarget = e.currentTarget;
    let clientX = 0;
    let clientY = 0;
    e.clientX ? clientX = e.clientX : clientX = e.pageX;
    e.clientY ? clientY = e.clientY : clientX = e.pageX;
    let x = clientX/zoomTarget.clientWidth*100;
    let y = clientY/zoomTarget.clientHeight*100;
    zoomTarget.style.backgroundPosition = x + "%" + y + "%";
  };

  return (
    <div id="expanded-image-gallery">
      <section id="expanded-image-container">
        <div id="close-expanded" className="overview" onClick={handleCloseClick}>
          <i className="overview fa-solid fa-xmark"></i>
        </div>
        {zoom &&
          <figure id="zoomed-main" className="overview" style={{
            backgroundImage: `url(${photos[photoId].url})`,
            backgroundSize: `${zoomSize}`,
            backgroundPosition: `${expandedDimensions[0]}% ${expandedDimensions[1]}%`
            }} onMouseMove={zoomIn} onClick={handleZoomCloseClick}>
            <img id="zoomed-main-image" className="overview" src={photos[photoId].url} alt="zoomed main image"></img>
          </figure>
        }
        {!zoom &&
          <img id="expanded-main-image" className="overview" src={photos[photoId].url} onClick={handleZoomOpenClick}></img>
        }
        {!zoom &&
          <div id="expanded-thumbnail-view">
            {photos.map((photo, i) => {
              return (
                <div key={i}>
                  {i === photoId &&
                    <div className="overview expanded-thumbnail-shadow" onClick={trackingFunction}>
                      <i className="overview fa-solid fa-circle circle-icon"></i>
                    </div>
                  }
                  {i !== photoId &&
                    <div className="overview expanded-thumbnail-shadow" onClick={trackingFunction}>
                      <i className="overview fa-regular fa-circle circle-icon" onClick={() => setPhotoId(i)}></i>
                    </div>
                  }
                </div>
              )
            })}
            <div id="expanded-arrows">
              {photoId !== 0 &&
                <BackArrow expanded={expanded} handleBackArrowClick={handleBackArrowClick}/>
              }
              {photoId !== (photos.length - 1) &&
                <ForwardArrow expanded={expanded} handleForwardArrowClick={handleForwardArrowClick}/>
              }
            </div>
          </div>
        }
      </section>
    </div>
  );
};