import {useState, useEffect} from "react";
import Overview from "./Overview/Overview.jsx";
import QANDA from "./Q&A/Q&A.jsx";
import RANDR from "./RR/RR.jsx";
import RIANDCOMP from "./RI&COMP/RI&COMP.jsx";
import axios from 'axios';


export default function App() {
  const [productId, setProductId] = useState(0);
  const [loading, setLoading] = useState(true);

  const getProductId = () => {
    return axios.get("/info", {params: {route: '/products', apiParams: {page: '1', count: '5'}}})
      .then((response) => {
        setProductId(response.data[4].id);
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
      <Overview productId={productId}/>
      <QANDA productId={productId}/>
      <RANDR productId={productId}/>
    </div>
  );
}
