import {useState, useEffect} from "react";

let imgLocate = 0;

export default function AvgRating({ avgRating }) {
  let countArr = []

  for(var i = 0.25; i <=5; i+=0.25){
    countArr.push(i)
  }

  return (
    <div className='overview-stars' style={{display: 'flex'}}>
      {countArr.map((id, key)=>{
        const outlineStar = {
          width: `4px`,
          height: '14px',
          caretColor: 'transparent',
          backgroundImage: `url(${require('./star.gif')})`,
          backgroundRepeat:  `no-repeat`,
          backgroundPosition: `-${imgLocate}px 0px`,
          backgroundSize: `14px auto`
        };

        const solidStar = {
          width: `4px`,
          height: '14px',
          caretColor: 'transparent',
          backgroundImage: `url(${require('./star.gif')})`,
          backgroundRepeat:  `no-repeat`,
          backgroundPosition: `-${imgLocate}px -15px`,
          backgroundSize: `14px auto`
        };

        imgLocate = imgLocate === 12 ? 0 : imgLocate + 4;
        return (
          <div style={id <= avgRating ? solidStar : outlineStar} key={key}></div>
        )
      })}
    </div>
  )
}