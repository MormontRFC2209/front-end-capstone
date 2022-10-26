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
// const initialImageValue = {

// }



var submittedImages = [];

let checkQuestion = false;
let checkUsername = false;
let checkEmail = false;


const Modal = ({isShowing, hide, id}) => {

  function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
  }

  var forceUpdate = useForceUpdate();


  const [currentInput, setInput] = useState(initialValues)
  const [imageInput, setImageInput] = useState(submittedImages)

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

    setInput({
      ...currentInput,
      [name]: value
    })
  }

  var getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
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


    var answerObject = {
      body: currentInput.answerform,
      name: currentInput.username,
      email: currentInput.email,
      photos: submittedImages
    }

    axios.post('/info',answerObject, {params: {route: '/qa/questions/'+ id +'/answers', apiParams: {question_id: id}}})
      .then((result) => {

        setInput(initialValues);
        submittedImages = [];
        setImageInput(submittedImages)
        hide();
      })
      .catch((error) => {
        console.log('failed', error)
      })
  }

  var submitImage = (event) => {
    event.preventDefault();

    var name = event.target.files[0].name


    getBase64(event.target.files[0], (result) => {

      var apiObject = {base64Img: result,nameGiven: name}
      axios.post('/image', apiObject )
        .then((apiCallResult) => {
          console.log(apiCallResult)
          submittedImages.push(apiCallResult.data.url)



          setImageInput(submittedImages)

          forceUpdate();

        })
    })




  }

  var resetValues = () => {
    setInput(initialValues);
    setImageInput([]);
  }








  if(isShowing) {
    return ReactDOM.createPortal(
      <>
      <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={()=>{hide(); resetValues();}}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
          <div id="ANSWERDIV">
                <div>
                 <span>Answer</span><span>*</span>
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

            {imageInput.length < 5 ?
            <div id="ChooseAFile">
              Upload A Photo!
              <input type="file" name="answerImageURL" id="hiddenFileInput" onChange={submitImage} />
            </div>
            : null}

            <div id="PHOTODIV">
              {imageInput.length > 0 ? imageInput.map((singleImage) => {
                return <img id="answerThumbnail" src={singleImage} key={Math.random()}></img>
              }): null}
            </div>

            <div id="REQUIREDIV">
              <span>* = Required</span>
            </div>
            <button id="submitButton" onClick={submitAnswer}>Submit Answer.</button>
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