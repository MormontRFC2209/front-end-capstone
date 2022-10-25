import {useState, useEffect} from "react";
import axios from 'axios';

let photos = []
export default function UpLoadImg(props) {

  function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
  }

  var forceUpdate = useForceUpdate();
  const [imageInput, setImageInput] = useState(photos)

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
  }

  const submitImage = (e) => {
    e.preventDefault();

    var name = e.target.files[0].name
    // console.log(e.target.files[0])

    getBase64(e.target.files[0], (result) => {

      var apiObject = {base64Img: result,nameGiven: name}
      axios.post('/image', apiObject )
        .then((result) => {
          // console.log('result',result)
          photos.push(
            result.data.url
            // thumbnailUrl:result.data.thumbnailUrl
          )
          props.setPhotos(photos)
          forceUpdate();
        })
    })
  }

  return (
    <>
    <input
        type="file"
        id="file"
        multiple
        onChange={submitImage}
        accept="image/*"
        />
        {imageInput.length > 5 ? <div>Limited 5 images </div> : null}
        {/* <div> */}
        {imageInput.length > 0 ? imageInput.map((singleImage) => {
          return <img style={{display:'inline-block',float:'left',width:'50px'}} src={singleImage} key={Math.random()}></img>
        }): null}
        {/* </div> */}
        </>
  )
}