import {useState, useEffect} from "react";


let imgLocate = 0;
export default function AveRating({reviews,aveRating}) {

  let countArr = []

  for(var i = 0.25; i <=5; i+=0.25){
    countArr.push(i)
  }

  return (
    <ul style={{display: 'inline-block',float: 'left'}}>
       {countArr.map((id,key)=>{
          const outlineStar = {
            display: 'inline-block',
            width: `3.5px`,
            height: '14px',
            float:'left',
            caretColor: 'transparent',
            backgroundImage: `url(${require('./star.gif')})`,
            backgroundRepeat:  `no-repeat`,
            backgroundPosition: `-${imgLocate}px 0px`,
            listStyle: 'none',
            backgroundSize: `14px auto`,
          }

          const solidStar = {
            display: 'inline-block',
            width: `3.5px`,
            height: '14px',
            float:'left',
            caretColor: 'transparent',
            backgroundImage: `url(${require('./star.gif')})`,
            backgroundRepeat:  `no-repeat`,
            backgroundPosition: `-${imgLocate}px -15px`,
            listStyle: 'none',
            backgroundSize: `14px auto`,
          }
          imgLocate = imgLocate === 10.5 ? 0 : imgLocate+3.5;
        return (
        <li style={id<=aveRating?solidStar:outlineStar} id={id} key={key}></li>
        )
      })}
    </ul>
  )
}