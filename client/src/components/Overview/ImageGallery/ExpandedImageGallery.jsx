import { useState, useEffect } from 'react';
import BackArrow from './BackArrow.jsx';
import ForwardArrow from './ForwardArrow.jsx';

export default function ExpandedImageGallery({ photos, photoId, expanded, setExpanded, setPhotoId, handleBackArrowClick, handleForwardArrowClick }) {
  const [zoom, setZoom] = useState(false);
  const [expandedDimensions, setExpandedDimensions] = useState([0, 0]);
  const [zoomSize, setZoomSize] = useState('');

  const handleZoomClick = (e) => {
    setZoom(true);
    setExpandedDimensions([e.currentTarget.clientWidth, e.currentTarget.clientHeight]);
    if (e.currentTarget.clientWidth >= e.currentTarget.clientHeight) {
      setZoomSize(`${e.currentTarget.clientWidth * 2.5}px auto`);
    } else {
      setZoomSize(`auto ${e.currentTarget.clientHeight * 2.5}px`);
    }
  };

  const zoomIn = (e) => {
    const zoomTarget = e.currentTarget;
    let clientX = 0;
    let clientY = 0;
    e.clientX ? clientX = e.clientX : clientX = e.pageX;
    e.clientY ? clientY = e.clientY : clientX = e.pageX;
    let offsetX = clientX + zoomTarget.offsetWidth - zoomTarget.clientWidth;
    let offsetY = clientY + zoomTarget.offsetWidth - zoomTarget.clientWidth;
    let x = offsetX/zoomTarget.offsetWidth*100;
    let y = offsetY/zoomTarget.offsetHeight*100;
    zoomTarget.style.backgroundPosition = x + '%' + y + '%';
  };

  return (
    <div className='expanded-image-gallery'>
      <section className='expanded-image-container'>
        <div className='close-expanded' onClick={() => setExpanded(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        {zoom &&
          <figure className='zoomed-main-image' style={{
            backgroundImage: `url(${photos[photoId].url})`,
            backgroundSize: `${zoomSize}`
            }} onMouseMove={zoomIn} onClick={() => setZoom(false)}>
            <img src={photos[photoId].url} alt='zoomed main image'></img>
          </figure>
        }
        {!zoom &&
          <img className='expanded-main-image' src={photos[photoId].url} onClick={handleZoomClick}></img>
        }
        {!zoom &&
          <div className='expanded-thumbnail-view'>
            {photos.map((photo, i) => {
              return (
                <div key={i}>
                  {i === photoId &&
                    <div className='expanded-thumbnail-shadow'>
                      <i className="fa-solid fa-circle"></i>
                    </div>
                  }
                  {i !== photoId &&
                    <div className='expanded-thumbnail-shadow'>
                      <i className="fa-regular fa-circle" onClick={() => setPhotoId(i)}></i>
                    </div>
                  }
                </div>
              )
            })}
            <div className='expanded-arrows'>
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