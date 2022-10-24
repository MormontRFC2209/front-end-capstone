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
  }
  const onSubmit = ()=>{
    if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email))) {
      alert('please enter correct Email');
      return
  }
    if(recommend===''){
      alert('please make one recommend choice')
      return
    }
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
    console.log('newReview',newReview)
    props.addReview(newReview)
         .then(result=>{
          console.log('hello??')
         })
          .catch((error) => {
        console.log('failed', error)
      })

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
  return (
    <div>
      <div className='writeBox'>
        <div
          className={`container ${state ? 'active' : ''}`}
          // onClick={handleClick}
        >
          <div className="Popup" onClick={(e) => e.stopPropagation()}>
            <section>
      <header>
        <h2>Write a Review</h2>
        <small>{props.productName}</small>
      </header>
      <br/>
      <div>
      <NewRating getRating={setRating}/>
      <Characteristics metaData={props.metaData} setCharacteristics={setCharacteristics}/>
      </div>
      <form>
        <br/>
        <label style={{display: 'block'}}>
        <span style={{display: 'block'}}>Review Headline</span>
          <input
            required
            onChange={(e)=>setSummary(e.target.value)}
            style={{width: '80%'}}
            type="text"
            placeholder="I would buy this product again..."
            required=""
          />
        </label>
        <br/>
        <label style={{display: 'block'}}>
        <span style={{display: 'block'}}>Comments</span>
        <textarea
            required
            onChange={(e)=>setBody(e.target.value)}
            style={{display: 'block',width: '80%'}}
            cols="68"
            rows="4"
            name="Comments"
            placeholder="How you use the product.Things that are great about it"
            required=""
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
        <span style={{display: 'block'}}>User First Name</span>
          <input
            required
            onChange={(e)=>setUserName(e.target.value)}
            style={{width: '80%'}}
            type="text"
            placeholder="Please leave your FirstName..."
            required=""
          />
        <br/>
        <br/>
        <span style={{display: 'block'}}>Email address</span>
          <input type='text' style={{width: '80%'}} onChange={handleEmail} placeholder="Please leave your Email address..."/>
          <br/>
          <br/>
        <div>
        </div>
      </form>
        <UpLoadImg setPhotos={setPhotos}/>
        {/* {console.log(photos)} */}
        <button onClick={onSubmit}>SUBMIT REVIEW</button>
    </section>
          </div>
        </div>
      </div>
    </div>
  )
}