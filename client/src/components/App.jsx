import {useState, useEffect} from "react";
import Overview from "./Overview/Overview.jsx";
import QANDA from "./Q&A/Q&A.jsx";
import RANDR from "./Rating/RR.jsx";
import RIANDCOMP from "./RI&COMP/RI&COMP.jsx";
import axios from 'axios';


export default function App() {
  const [productId, setProductId] = useState(0);
  const [productName,setProductName] = useState('')
  const [loading, setLoading] = useState(true);
  const [reviews,setReviews] = useState([])

  const getProductId = () => {
    return axios.get("/info", {params: {route: '/products', apiParams: {page: '2', count: '5'}}})
      .then((response) => {
        setProductId(response.data[1].id);
        setProductName(response.data[1].name)
        setLoading(false);
      })
      .catch((err) => console.log('err'))
  };

  useEffect(() => {
    getProductId()
      .catch((err) => console.log(err))
  }, []);

  if (loading) {
    return <div>Currently Loading...</div>
  }

  return (
    <div>
      {console.log('isReviews',reviews)}
      <div className='website-banner'>
        <h1 className='website-title'> <em>HOUSE MORMONT</em> </h1>
      </div>
      <Overview productId={productId} reviews={reviews}/>
      <QANDA productId={productId}/>
      <RANDR productId={productId} productName={productName} setReviews={setReviews} reviews={reviews}/>
    </div>
  );
}
