import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import {useState, useEffect} from "react";
import axios from 'axios';


const initialValues = {
  answerform:"",
  username:"",
  email:"",
  answerImageURL: ""

}

const Modal = ({isShowing, hide, id}) => {



  const [currentInput, setInput] = useState(initialValues);

  var handleInputChange = (event) => {
    const {name, value} = event.target;

    setInput({
      ...currentInput,
      [name]: value
    })
  }


  var submitAnswer = () => {
    event.preventDefault();


    var questionObject = {
      body: currentInput.answerform,
      name: currentInput.username,
      email: currentInput.email,
      product_id: id
    }

    axios.post('/info',questionObject, {params: {route: '/qa/questions/', apiParams: {question_id: id}}})
      .then((result) => {
        console.log('question submitted', result)
        setInput(initialValues);
        hide();
      })
      .catch((error) => {
        console.log('failed', error)
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
              placeholder="Example: jackson11!"
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
              placeholder="Why did you like the product or not?"
              required=""
              autoComplete="off"
              value={currentInput.name}
              onChange={handleInputChange}
              ></textarea>
            For authentication reasons, you will not be emailed.</label>

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