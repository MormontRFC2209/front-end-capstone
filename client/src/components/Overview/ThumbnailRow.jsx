import react from 'react';

export default function ThumbnailRow({ row }) {
  return (
    <div className='styleSelectorRow'>
      {row.map((style, k) => {
        return (
          <a key={k} alt='' href='' className='thumbnail-block'>
            <img className='thumbnail' src={style.photos[0].thumbnail_url} alt={style.name}></img>
            <i className="fa-light fa-circle-check"></i>
          </a>
        )
      })}
    </div>
  )
}