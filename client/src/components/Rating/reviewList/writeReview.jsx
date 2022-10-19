import React, { useState } from 'react'
import styles from './writeReview.css'
import NewRating from '../ratingStars/postNewRating.jsx'
import UpLoadImg from './upLoadImg.jsx'
export default function WriteRview(props) {
  const [state, setState] = useState(true)
  const [rating,setRating]= useState(0)
  const [summary,setSummary]= useState('')
  const [body,setBody]= useState('')
  const [recommend,setRecommend]=useState(false)
  const [userName,setUserName] = useState('')
  const [photos,setPhotos]=useState([])
  const handleClick = () => {
    setState(false)
  }
  const onSubmit = ()=>{
    let newReview = {
      product_id:Number(props.product_id),
      rating:Number(rating),
      summary:summary,
      body:body,
      recommend:recommend,
      name:userName,
      photos:[],
      // characteristics:
    }

    handleClick()
    props.setWrite(false);
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
      </header>
      <br/>

      <form>
        <label style={{display: 'block'}}>
        <NewRating getRating={setRating}/>
        </label>
        <br/>
        <label style={{display: 'block'}}>
        <span style={{display: 'block'}}>Review Headline</span>
          <input
            required
            onChange={(e)=>setSummary(e.target.value)}
            style={{width: '600px'}}
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
            style={{display: 'block'}}
            cols="68"
            rows="4"
            name="Comments"
            placeholder="How you use the product.Things that are great about it"
            required=""
          ></textarea>
          <small>The most helpful reviews are 250 characters.</small>
        </label>
        <br/>
        <input
            type="checkbox"
            onClick={(e)=>{e.target.checked?setRecommend(true):setRecommend(false)}}
        />
        <label> Yes, I would recommend this to a friend</label>
        <br/>
        <br/>
        <span style={{display: 'block'}}>User Name</span>
          <input
            required
            onChange={(e)=>setUserName(e.target.value)}
            style={{width: '600px'}}
            type="text"
            placeholder="Please leave your UserName..."
            required=""
          />
          <br/>
          <br/>
        <div>
        </div>
      </form>
        <UpLoadImg setPhotos={setPhotos}/>
        <button onClick={onSubmit}>SUBMIT REVIEW</button>
    </section>
          </div>
        </div>
      </div>
    </div>
  )
}