import {useState, useEffect} from "react";
import Overview from "./Overview/Overview.jsx";
import QANDA from "./Q&A/Q&A.jsx";
import RANDR from "./Rating/RR.jsx";
import RIANDCOMP from "./RI&COMP/RI&COMP.jsx";
import axios from 'axios';


export default function App() {
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  const getProductId = () => {
    return axios.get("/info", {params: {route: '/products', apiParams: {page: '1', count: '5'}}})
      .then((response) => {
        setProductId(response.data[4].id);
        setProductName(response.data[4].name);
        setLoading(false);
      })
      .catch((err) => console.log('err'))
  };

  useEffect(() => {
    getProductId()
      .catch((err) => console.log(err))
  }, []);

  var trackingFunction = (event) => {
    event.preventDefault();

    var currentEvent = event

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;


    var trackingObject = {Module: event.target.className, Location: event.target.id, Time: dateTime}
    console.log(trackingObject)
  }

  if (loading) {
    return <div>Currently Loading...</div>
  }




  return (
    <div className="">
      <div className='website-banner'>
        <h1 className='website-title'> <em>HOUSE MORMONT</em> </h1>
      </div>
      <Overview productId={productId} reviews={reviews}/>
      <QANDA productId={productId} trackingFunction={trackingFunction}/>
      <a id='ratings-reviews-section'></a>
      <RANDR productId={productId} productName={productName} setReviews={setReviews} reviews={reviews}/>
    </div>
  );
}
