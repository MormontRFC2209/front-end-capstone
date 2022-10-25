import React, { useState } from 'react'
import styles from './writeReview.css'
import NewRating from '../ratingStars/postNewRating.jsx'
import UpLoadImg from './upLoadImg.jsx'
import Characteristics from './characteristics.jsx'

let characteristics = {}
export default function WriteRview(props) {
  const [state, setState] = useState(true)
  const [rating,setRating]= useState(0)
  const [summary,setSummary]= useState('')
  const [body,setBody]= useState('')
  const [recommend,setRecommend]=useState('')
  const [userName,setUserName] = useState('')
  const [photos,setPhotos]=useState([])
  const [email,setEmail]=useState('')
  const [characteristic,setCharacteristic]=useState({})
  const handleClick = () => {
    setState(false)
    props.setWrite(false)
  }
  const onSubmit = ()=>{
    var check = checkSummary() && checkBody();
	  if(check){
      return check
    }

    if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email))) {
      alert('please enter correct Email');
      return
  }
    // if(recommend===''){
    //   alert('please make one recommend choice')
    //   return
    // }
    let newReview = {
      product_id:Number(props.product_id),
      rating:Number(rating),
      summary:summary,
      body:body,
      recommend:recommend,
      name:userName,
      email:email,
      photos:photos,
      characteristics:characteristic
    }
    // console.log('newReview',newReview)
    props.addReview(newReview)
    handleClick()
    props.setWrite(false);
  }
  const recommendClick = (e)=>{
    e.target.id==='unRecommend'?setRecommend(false):setRecommend(true)
  }

  const handleEmail = (e) =>{
    let value = e.target.value;
    setEmail(value)
  }

  const setCharacteristics = (id,value)=>{
    characteristics[id]=value
    setCharacteristic(characteristics)
  }

  const checkSummary = (e)=>{
    let check = false;
    if(e.target.value.length === 0){
      e.target.setAttribute('aria-valid','inValid')
    }
    if(e.target.value.length >= 1){
      e.target.setAttribute('aria-valid','valid')
    }
    if(e.target.value.length >= 60){
      e.target.setAttribute('aria-valid','inValid')
      setBody(e.target.value)
      check=true;
    }
    return check
  }

  const checkBody = (e,checked)=>{
      let check = false;
      if(e.target.value.length === 0){
        e.target.setAttribute('aria-valid','inValid')
      }
      if(e.target.value.length >= 1){
        e.target.setAttribute('aria-valid','process')
      }
      if(e.target.value.length >= 50){
        e.target.setAttribute('aria-valid','valid')
        setBody(e.target.value)
        check=true;
      }
      return check
  }

  return (
    <div>
      <div className='writeBox'>
        <div
          className={`container ${state ? 'active' : ''}`}
        >
          <div className="Popup" onClick={(e) => e.stopPropagation()}>
            <section>
      <form action="http://localhost:3000/#ratings-reviews-section" onSubmit={onSubmit}>
      <header>
        <h2>Write a Review</h2>
        <small>{props.productName}</small>
      </header>
      <br/>
      <div>
      <NewRating getRating={setRating}/>
      <Characteristics metaData={props.metaData} setCharacteristics={setCharacteristics}/>
      </div>
        <br/>
        <label style={{display: 'block'}}>
        <span style={{display: 'block'}}>Review Headline</span>
          <input
            className='writeInput'
            onChange={checkSummary}
            type="text"
            placeholder="I would buy this product again..."
            required='true'
          />
          {/* <span id="checktext1"></span> */}
        </label>
        <br/>
        <label style={{display: 'block'}}>
        <span style={{display: 'block'}}>Comments</span>
        <textarea
            className='writeInput'
            onChange={checkBody}
            cols="68"
            rows="4"
            name="Comments"
            placeholder="How you use the product.Things that are great about it"
            required='true'
          ></textarea>
          <small>The most helpful reviews are 250 characters.</small>
        </label>
        <br/>
        <label htmlFor='radio' onClick={recommendClick}>
        <input name="recommend"  required type="radio" id='recommend'/>
        <label htmlFor="recommend" id='recommend'>Yes, I would recommend this to a friend</label>
        <input  name="recommend"  required type="radio" id='unRecommend'/>
        <label htmlFor="unRecommend" id='unRecommend'>No, I wouldn't recommend this to a friend</label>
        </label>
        <br/>
        <br/>
        <span style={{display: 'block'}}>Nickname Name</span>
          <input
            className='writeInput'
            onChange={(e)=>setUserName(e.target.value)}
            type="text"
            placeholder="Please leave your FirstName..."
            required='true'
          />
        <br/>
        <span style={{display: 'block'}}>Email address</span>
          <input type='text' onChange={handleEmail}  required='true' className='writeInput' placeholder="Please leave your Email address..."/>
          <br/>
        <div>
        </div>
        <UpLoadImg setPhotos={setPhotos}/>
        <input type='submit' value='SUBMIT REVIEW'/>
      </form>
        <button onClick={handleClick}>Close</button>
    </section>
          </div>
        </div>
      </div>
    </div>
  )
}