import {useState, useEffect} from "react";
import Overview from "./Overview/Overview.jsx";
import QANDA from "./Q&A/Q&A.jsx";
import RANDR from "./R&R/R&R.jsx";
import RIANDCOMP from "./RI&COMP/RI&COMP.jsx";
import axios from 'axios';


export default function App() {
  const getStuff = () => {
    axios.get("/info")
      .then((response) => console.log(response.data))
      .catch((err) => console.log('err'))
  };

  useEffect(() => {
    getStuff();
  }, []);

  return (<div> Hello World! </div>);
}
