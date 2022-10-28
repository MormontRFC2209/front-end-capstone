import React, { useState } from 'react'
import styles from './review.css'
import NewRating from '../ratingStars/postNewRating.jsx'
import UpLoadImg from './upLoadImg.jsx'
import Characteristics from './characteristics.jsx'
import ProgressBar from '../../subComponents/ProgressBar.jsx'

let characteristics = {}
let checkSr = false;
let checkBd = false;
let checkUn = false;
let checkEm = false;
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
  const [headerLimit,setHeaderLimit]=useState('A Headline input allowing up to 60 characters.')
  const [bodyLimit,setBodyLimit]=useState('The most helpful reviews are 250 characters.')
  const [nameLimit,setNameLimit]=useState('The most helpful reviews are 250 characters.')
  const [emailLimit,setEmailLimit]=useState('Please input correct Email address')
  const [fontColor,setFontColor]=useState('black')
  const [complete, setCompleted] = useState(0);
  const [backgroundColor, setBGCOLOR] = useState('#90EE90')

  const handleClick = () => {
    setState(false)
    props.setWrite(false)
  }
  const onSubmit = ()=>{
    if(!(checkSr&&checkBd&&checkUn&checkEm)){
      alert('pls check every input')
      return false
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
    console.log(newReview)
    props.addReview(newReview)
        .then(result=>{
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

  const setCharacteristics = (id,value)=>{
    characteristics[id]=value
    setCharacteristic(characteristics)
  }

  const checkSummary = (e)=>{
    if(e.target.value.length === 0){
      e.target.setAttribute('aria-valid','inValid')
      setHeaderLimit('A Headline input allowing up to 60 characters.')
      checkSr = false;
    }
    if(e.target.value.length >= 1){
      e.target.setAttribute('aria-valid','valid')
      setHeaderLimit(`Current input ${e.target.value.length} characters`)
      checkSr = true;
    }
    if(e.target.value.length >= 60){
      e.target.setAttribute('aria-valid','inValid')
      setHeaderLimit('A Headline input allowing up to 60 characters.')
      checkSr = false;
    }
    setSummary(e.target.value)
  }

  const checkBody = (e)=>{
      if(e.target.value.length === 0){
        e.target.setAttribute('aria-valid','inValid')
        setBodyLimit('The most helpful reviews are 250 characters.')
        checkBd = false;
        setFontColor('black')
        setBGCOLOR('rgb(224, 224, 222)')
      }
      if(e.target.value.length >= 1){
        setCompleted(e.target.value.length)
        setBGCOLOR('#eed202')
        e.target.setAttribute('aria-valid','process')
        checkBd = false;
        setFontColor('red')
        setBodyLimit(`Current input ${e.target.value.length} characters, still need ${50-e.target.value.length} characters`)
      }
      if(e.target.value.length >= 50){
        setBodyLimit(`Current input ${e.target.value.length} characters, Minimum reached`)
        e.target.setAttribute('aria-valid','valid')
        setFontColor('black')
        setBGCOLOR('#00FF00')
        checkBd = true;
      }
      setBody(e.target.value)
  }

  const handleUserName=(e)=>{
    if(e.target.value.length === 0){
      e.target.setAttribute('aria-valid','inValid')
      setNameLimit('Use your firstName or NickName, do not use your full name or email address')
      checkUn = false;
    }
    if(e.target.value.length >= 1){
      e.target.setAttribute('aria-valid','valid')
      checkUn = true;
      setNameLimit(`Current input ${e.target.value.length} characters`)

    }
    if(e.target.value.length >= 60){
      setNameLimit('A NickName input allowing up to 60 characters.')
      e.target.setAttribute('aria-valid','inValid')
      checkUn = false;
    }
    setUserName(e.target.value)
  }

  const handleEmail = (e) =>{
    let value = e.target.value;
    if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))) {
      e.target.setAttribute('aria-valid','inValid')
      setEmailLimit('Please input correct Email address')
      checkEm = false;
  }else{
    e.target.setAttribute('aria-valid','valid')
    setEmailLimit('Valid Email address')
    checkEm = true;
  }
  setEmail(value)
  }

  return (
    <div>
      <div className='writeBox'>
        <div className={`container ${state ? 'active' : ''}`}>
          <div className="Popup" onClick={(e) => e.stopPropagation()}>
            <section>
      <form>
      <header style={{position:'relative'}}>
        <h2>Write a Review</h2>
        <small>{props.productName}</small>
        <button style={{right:'30%',top:'5%',position:'fixed'}} id='reviewClose' onClick={handleClick}>X</button>
      </header>
      <br/>
      <div>
      <NewRating getRating={setRating}/>
      <Characteristics metaData={props.metaData} setCharacteristics={setCharacteristics}/>
      </div>
        <label style={{display: 'block'}}>
        <span style={{display: 'block'}}>Review Headline</span>
          <input
            className='writeInput'
            onChange={checkSummary}
            type="text"
            placeholder="I would buy this product again..."
            required
          />
          <small>{headerLimit}</small>
          {/* <span id="checktext1"></span> */}
        </label>
        <br/>
        <div>
        <span style={{display: 'block'}}>Comments</span>
        <textarea
            className='writeInput'
            onChange={checkBody}
            cols="80"
            rows="3"
            name="Comments"
            placeholder="How you use the product.Things that are great about it"
            required
          ></textarea>
          <ProgressBar bgcolor={backgroundColor} completed={complete}/>
          <small style={{color:fontColor}}>{bodyLimit}</small>
        </div>
        <br/>
        <label htmlFor='radio' onClick={recommendClick}>
        <input name="recommend"  required type="radio" id='recommend'/>
        <label htmlFor="recommend" id='recommend'>Yes, I would recommend this to a friend </label>
        <input  name="recommend"  required type="radio" id='unRecommend'/>
        <label htmlFor="unRecommend" id='unRecommend'>No, I wouldn't recommend this to a friend</label>
        </label>
        <br/>
        <br/>
        <span style={{display: 'block'}}>Nickname Name</span>
          <input
            className='writeInput'
            onChange={handleUserName}
            type="text"
            placeholder="Please leave your FirstName..."
            required
          />
        <br/>
        <span style={{display: 'block'}}>Email address</span>
          <input type='text' onChange={handleEmail}  required className='writeInput' placeholder="Please leave your Email address..."/>
          <small>{emailLimit}</small>
        <div>
        <br/>
        <UpLoadImg setPhotos={setPhotos}/>
        </div>
        <input style={{margin:'2vh 0'}}type='button' onClick={onSubmit} value='SUBMIT REVIEW'/>
        <br/>
      </form>
    </section>
          </div>
        </div>
      </div>
    </div>
  )
}