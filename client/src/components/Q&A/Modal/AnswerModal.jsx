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


const Modal = ({isShowing, hide, id}) => {

  function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
  }

  var forceUpdate = useForceUpdate();


  const [currentInput, setInput] = useState(initialValues)
  const [imageInput, setImageInput] = useState(submittedImages)

  var handleInputChange = (event) => {
    const {name, value} = event.target;

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
          submittedImages.push(apiCallResult.data.url)



          setImageInput(submittedImages)

          forceUpdate();

        })
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

            {imageInput.length < 5 ? <input type="file" name="answerImageURL" onChange={submitImage} /> : null}
            {imageInput.length > 0 ? imageInput.map((singleImage) => {
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