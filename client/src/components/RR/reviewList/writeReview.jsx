import React, { useState } from 'react'
import styles from './writeReview.css'
import NewRating from '../ratingStars/postNewRating.jsx'
export default function PopupCnter() {
  const [state, setState] = useState(true)
  const handleClick = (e) => {
    setState(false)
  }
  console.log(styles);
  return (
    <div>
      <div className='writeBox'>
        <div
          className={`container ${state ? 'active' : ''}`}
          onClick={handleClick}
        >
          <div className="Popup" onClick={(e) => e.stopPropagation()}>
            <section>
      <header>
        <h2>Write a Review</h2>
      </header>
      <br/>

      <form>
        <label style={{display: 'block'}}>
        <span style={{display: 'block'}}>YOUR RATING</span>
        <NewRating />
        </label>
        <br/>
        <label style={{display: 'block'}}>
        <span style={{display: 'block'}}>Review Headline</span>
          <input
            style={{width: '600px'}}
            type="text"
            placeholder="I would buy this product again..."
            required=""
            autocomplete="off"
          />
        </label>
        <br/>
        <label style={{display: 'block'}}>
        <span style={{display: 'block'}}>Comments</span>
        <textarea style={{display: 'block'}}
            cols="68"
            rows="4"
            name="Comments"
            placeholder="How you use the product.Things that are great about it"
            required=""
            autocomplete="off"
          ></textarea>
          <small>The most helpful reviews are 250 characters.</small>
        </label>
        <br/>
        <input type="checkbox" />
        <label> Yes, I would recommend this to a friend</label>
        <br/>
        <br/>
        <span style={{display: 'block'}}>User Name</span>
          <input
            style={{width: '600px'}}
            type="text"
            placeholder="Please leave your UserName..."
            required=""
            autocomplete="off"
          />
          <br/>
          <br/>
        <div>
        <button>UPLOAD IMG</button>
        <button>SUBMIT REVIEW</button>
        </div>
      </form>
    </section>
          </div>
        </div>
      </div>
    </div>
  )
}