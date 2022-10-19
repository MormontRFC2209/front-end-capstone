import {useState, useEffect} from "react";
import axios from 'axios';

export default function UpLoadImg(props) {

  const addPhoto= (e) => {
    var img = new FormData();

    img.append("image", e.target.files[0]);
  }

  return (
    <input
        type="file"
        id="file"
        multiple
        onChange={e=>addPhoto(e)}
        accept="image/*"
        />
  )
}