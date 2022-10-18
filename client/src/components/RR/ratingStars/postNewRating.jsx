import {useState, useEffect} from "react";

let num = 0;
export default function NewRating(props) {

  let countArr = []

  for(var i = 0; i <5; i++){
    countArr.push(i)
  }

  const [rating,setRating]=useState(0)

  const onClick = (e)=>{
    setRating(e.target.id);
  }



  return (
    <ul>
      {countArr.map((id,key)=>{
          const outlineStar = {
            display: 'inline-block',
            width: `14px`,
            height: '14px',
            float:'left',
            caretColor: 'transparent',
            backgroundImage: `url(${require('./star.gif')})`,
            backgroundRepeat:  `no-repeat`,
            backgroundPosition: `0px 0px`,
            listStyle: 'none',
            backgroundSize: `14px auto`,
          }

          const solidStar = {
            display: 'inline-block',
            width: `14px`,
            height: '14px',
            float:'left',
            caretColor: 'transparent',
            backgroundImage: `url(${require('./star.gif')})`,
            backgroundRepeat:  `no-repeat`,
            backgroundPosition: `0px -15px`,
            listStyle: 'none',
            backgroundSize: `14px auto`,
          }
        return (
        <li onClick={onClick} style={id<=rating?solidStar:outlineStar} id={id} key={key}></li>
        )
      })}
    </ul>
  )
}
