import {useState, useEffect} from "react";

let num = 0;
export default function NewRating(props) {

  let countArr = []

  for(var i = 1; i <=5; i++){
    countArr.push(i)
  }

  const [rating,setRating]=useState(0)
  const [zero,setZero]=useState(true)
  const [comfirm,setComfirm]=useState(false)
  const [selectEmoji,setSelectEmoji]=useState('🤗')
  const [selectMood,setSelectMood]=useState('Please rate it')

  const emoji = ['😫','😞','😐','😊','🤩']
  const mood = ['poor','accept', 'as expected', 'great','perfect']
  const onClick = (e)=>{
    setRating(e.target.id);
    setSelectEmoji(emoji[e.target.id-1])
    props.getRating(e.target.id);
    setComfirm(true);
  }

  const onMouseOver = (e)=>{
    setRating(e.target.id);
    setSelectEmoji(emoji[e.target.id-1])
    setSelectMood(mood[e.target.id-1])
  }

  const onMouseOut = (e) => {
    setRating(0);
    setSelectEmoji('🤗')
    setSelectMood('Please rate it')
  }

  const outlineStar = {
    display: 'inline-block',
    width: `18px`,
    height: '14px',
    float:'left',
    caretColor: 'transparent',
    backgroundImage: `url(${require('./star.gif')})`,
    backgroundRepeat:  `no-repeat`,
    backgroundPosition: `0px 0px`,
    listStyle: 'none',
    backgroundSize: `14px auto`,
    cursor: 'pointer'
  }

  const solidStar = {
    display: 'inline-block',
    width: `18px`,
    height: '14px',
    float:'left',
    caretColor: 'transparent',
    backgroundImage: `url(${require('./star.gif')})`,
    backgroundRepeat:  `no-repeat`,
    backgroundPosition: `0px -15px`,
    listStyle: 'none',
    backgroundSize: `14px auto`,
    cursor: 'pointer'
  }


  return (
    <ol style={{display: 'inline-block',width:'100%',overflow:'hidden'}}>
      <h5>YOUR RATING</h5>
      {countArr.map((id,key)=>{
        return (
        <li onClick={onClick} onMouseOver={!comfirm?onMouseOver:null} onMouseOut={!comfirm?onMouseOut:null} style={id<=rating?solidStar:outlineStar} id={id} key={key}></li>
        )
      })}
      <span>{selectEmoji} {selectMood}</span>
    </ol>
  )
}
