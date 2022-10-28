import {useState, useEffect} from "react";
import Overview from "./Overview/Overview.jsx";
import QANDA from "./Q&A/Q&A.jsx";
import RANDR from "./Rating/RR.jsx";
import RIANDCOMP from "./RI&COMP/RI&COMP.jsx";
import axios from 'axios';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';


export default function App() {
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState('Heir Force Ones');
  const [loading, setLoading] = useState(productId === 0);
  const [reviews, setReviews] = useState([]);


  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();

  const product = query.get('productid')



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
    if(product) {
      setProductId(product)
      setLoading(false);
    }
    if (!product) {
      getProductId()
        .catch((err) => console.log(err))
    }
  }, []);

  if (loading) {
    return <div className='app-load loading'>Currently Loading</div>
  }

  var trackingFunction = (event) => {
    event.preventDefault();

    var currentEvent = event

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    var moduleName = event.target.className.split(' ')[0];
    var locationName = event.target.className.split(' ').slice(1).join(' ') + (event.target.id);

    var trackingObject = {widget: moduleName, element: locationName, time: dateTime}
    axios.post('/info',trackingObject, {params: {route: '/interactions'}})
      .then((result) => {
        console.log('click tracked', result)
      })
      .catch((error) => {
        console.log('failed', error)
      })
  }

  if (loading) {
    return <div>Currently Loading...</div>
  }




  return (
    <div className='app'>
      <div className="website-banner">
        <h1 className='website-title'> <em>HOUSE MORMONT</em> </h1>
      </div>
      <Overview productId={productId} reviews={reviews} trackingFunction={trackingFunction} setProductName={setProductName}/>
      <QANDA productId={productId} trackingFunction={trackingFunction}/>
      <a id='ratings-reviews-section'></a>
      <RANDR productId={productId} productName={productName} setReviews={setReviews} reviews={reviews}/>
      <div id="app-whitespace"></div>
    </div>
  );
}
