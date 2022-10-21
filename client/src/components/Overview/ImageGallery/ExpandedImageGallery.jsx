import { useState, useEffect } from 'react';
import BackArrow from './BackArrow.jsx';
import ForwardArrow from './ForwardArrow.jsx';

export default function ExpandedImageGallery({ photos, photoId, expanded, setExpanded, setPhotoId, handleBackArrowClick, handleForwardArrowClick }) {
  const [zoom, setZoom] = useState(false);

  return (
    <div className='expanded-image-gallery'>
      <section className='expanded-image-container'>
        <div className='close-expanded' onClick={() => setExpanded(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <img className='expanded-main-image' src={photos[photoId].url} alt='expanded main image'></img>
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