import react from 'react';

export default function ThumbnailRow({ row }) {
  return (
    <div className='styleSelectorRow'>
      {row.map((style, k) => {
        return (
          <div key={k} className='thumbnail-block'>
            <img className='thumbnail' src={style.photos[0].thumbnail_url} alt={style.name}></img>
            <i className="fa-solid fa-circle-check icon-tag"></i>
          </div>
        )
      })}
    </div>
  )
}