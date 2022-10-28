import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import {useState, useEffect} from "react";
import axios from 'axios';
import ProgressBar from '../../subComponents/ProgressBar.jsx';


const initialValues = {
  answerform:"",
  username:"",
  email:"",
  answerImageURL: ""

}

let checkQuestion = false;
let checkUsername = false;
let checkEmail = false;

const Modal = ({isShowing, hide, id}) => {

  const [complete, setCompleted] = useState(0);
  const [backgroundColor, setBGCOLOR] = useState('#90EE90')

  const [currentInput, setInput] = useState(initialValues);

  var handleInputChange = (e) => {
    const {name, value} = e.target;

    if(name === 'answerform') {
      if(value.length === 0){
        e.target.setAttribute('aria-valid','inValid')
        checkQuestion = false;
      }
      if(value.length >= 1){
        e.target.setAttribute('aria-valid','valid')
        checkQuestion = true;
      }
      if(value.length >= 1000){
        e.target.setAttribute('aria-valid','inValid')
        checkQuestion = false;
      }
    }
    if(name === 'username') {
      if(e.target.value.length === 0){
        e.target.setAttribute('aria-valid','inValid')
        checkUsername = false;
      }
      if(e.target.value.length >= 1){
        e.target.setAttribute('aria-valid','valid')
        checkUsername = true;

      }
      if(e.target.value.length >= 60){
        e.target.setAttribute('aria-valid','inValid')
        checkUsername = false;
      }
    }
    if(name === 'email') {
      if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))) {
        e.target.setAttribute('aria-valid','inValid')
        checkEmail = false;
      }else{
        e.target.setAttribute('aria-valid','valid')
        checkEmail = true;
      }
    }

    if(name === 'answerform') {
      setCompleted(currentInput.answerform.length / 10)
      if(currentInput.answerform.length > 500) {
        setBGCOLOR('#eed202')
        if(currentInput.answerform.length > 1000) {
          setBGCOLOR('#cf142b')
        }
      }
    }

    setInput({
      ...currentInput,
      [name]: value
    })

  }


  var submitAnswer = () => {
    event.preventDefault();

    if(!(checkQuestion&&checkUsername&&checkEmail)){
      if(!checkEmail) {
        alert('Please provide an email address in the correct format.')
        return;
      }
      alert('Please make sure that all inputs are valid.')
      return;
    }


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
        setBGCOLOR('#90EE90');
        setCompleted(0);
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
            <div id="ANSWERDIV">
                <div>
                 <span>Question</span><span>*</span>
                </div>
                <textarea
                type="text"
                name="answerform"
                className="QANDA"
                id="BODYOFINPUT"
                rows="5"
                cols="40"
                placeholder="Why did you like the product or not?"
                autoComplete="off"
                value={currentInput.name}
                onChange={handleInputChange}

                ></textarea>
                <ProgressBar bgcolor={backgroundColor} completed={complete}/>
                <span>You have {1000 - currentInput.answerform.length} characters left.</span>
            </div>

            <div id="USERNAMEDIV">
                <div>
                  <span>Username</span><span>*</span>
                </div>
                <textarea
                type="text"
                name="username"
                className="QANDA"
                id="USERNAMEOFINPUT"
                placeholder="Example: jackson11!"
                autoComplete="off"
                value={currentInput.name}
                onChange={handleInputChange}

                ></textarea>
                <div>
                  <span>For privacy reasons, do not use your full name or email address</span>
                </div>
            </div>

            <div id="EMAILDIV">
                <div>
                  <span>Email</span><span>*</span>
                </div>
                <textarea
                type="text"
                name="email"
                className="QANDA"
                id="EMAILOFINPUT"
                placeholder="Example: jack@email.com"
                autoComplete="off"
                value={currentInput.name}
                onChange={handleInputChange}

                ></textarea>
                <div>
                  <span>For authentication reasons, you will not be emailed</span>
                </div>
            </div>
            <div id="REQUIREDIV">
              <span>* = Required</span>
            </div>
            <button id="submitButton"onClick={submitAnswer}>Submit Answer.</button>
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