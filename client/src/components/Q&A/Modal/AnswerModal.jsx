import React from 'react';
import ReactDOM from 'react-dom';
import './AnswerModal.css';
import {useState, useEffect} from "react";
import axios from 'axios';


const initialValues = {
  answerform:"",
  username:"",
  email:"",
  answerImageURL: ""

}
// const initialImageValue = {

// }

var submittedImages = [];


const Modal = ({isShowing, hide, id}) => {

  console.log(id)

  const [currentInput, setInput] = useState(initialValues)
  const [imageInput, setImageInput] = useState([])

  var handleInputChange = (event) => {
    const {name, value} = event.target;

    setInput({
      ...currentInput,
      [name]: value
    })
  }

  var submitAnswer = () => {
    event.preventDefault();


    var answerObject = {
      body: currentInput.answerform,
      name: currentInput.username,
      email: currentInput.email,
      photos: []
    }

    axios.post('/info',answerObject, {params: {route: '/qa/questions/'+ id +'/answers', apiParams: {question_id: id}}})
      .then((result) => {
        console.log('answer submitted', result)
      })
      .catch((error) => {
        console.log('failed', error)
      })
  }

  var submitImage = (event) => {
    event.preventDefault();
    const {name} = event.target

    submittedImages.push(currentInput.answerImageURL)


    setInput({
      ...currentInput,
      [name]: ''
    })


  }






  if(isShowing) {
    return ReactDOM.createPortal(
      <>
      <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <label>Required
              <textarea
              type="text"
              name="answerform"
              placeholder="Place your answer here..."
              required=""
              autoComplete="off"
              value={currentInput.name}
              onChange={handleInputChange}

              ></textarea>
            </label>
            <label>What is your username?
              <textarea
              type="text"
              name="username"
              placeholder="Example: jack543!"
              required=""
              autoComplete="off"
              value={currentInput.name}
              onChange={handleInputChange}
              ></textarea>
            For privacy reasons, do not use your full name or email address.</label>
            <label>Required
              <textarea
              type="text"
              name="email"
              placeholder="Example: jack@email.com"
              required=""
              autoComplete="off"
              value={currentInput.name}
              onChange={handleInputChange}
              ></textarea>
            For authentication reasons, you will not be emailed.</label>
            <input type="file" name="answerImageURL" value={currentInput.answerImageURL} onChange={handleInputChange} placeholder="Example: https://images.unsplash.com/photo-1548430395-ec39e…cHBfaWQiOjEyMDd9"/>
            {submittedImages.length < 5 ? <button onClick={submitImage}>Submit Image</button> : null}
            {submittedImages.length > 0 ? submittedImages.map((singleImage) => {
              return <img className="answerThumbnail" src={singleImage} key={Math.random()}></img>
            }): null}

            <button onClick={submitAnswer}>Submit Answer.</button>
          </form>
        </div>
      </div>
    </>, document.body
    )
  } else {
    return null
  }

}


export default Modal;