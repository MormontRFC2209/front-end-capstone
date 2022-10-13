import {useState, useEffect} from "react";
import axios from 'axios';

import ImageGallery from './ImageGallery.jsx';
import ProductHeading from './ProductHeading.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductDescription from './ProductDescription.jsx';

export default function Overview() {
  const [productId, setProductId] = useState(0);
  const [productInfo, setProductInfo] = useState([]);
  const [styles, setStyles] = useState([]);

  const getProductId = () => {
    return axios.get("/info", {params: {route: '/products', apiParams: {page: '2', count: '5'}}})
      .then((response) => {
        setProductId(response.data[1].id);
      })
      .catch((err) => console.log('err'))
  };

  const getProductInfo = () => {
    return axios.get("/info", {params: {route: `/products/${productId}`}})
      .then((response) => setProductInfo([response.data]))
      .catch((err) => console.log('err'))
  };

  const getStyles = () => {
    return axios.get("/info", {params: {route: `/products/${productId}/styles`}})
      .then((response) => setStyles(response.data.results))
      .catch((err) => console.log('err'))
  };

  useEffect(() => {
    getProductId()
      .catch((err) => console.log(err))
  }, []);

  useEffect(() => {
    if (productId > 0) {
      getProductInfo()
        .then(() => getStyles())
        .catch((err) => console.log(err))
    }
  }, [productId])

  return (
    <div>
      <ImageGallery />
      <ProductHeading productInfo={productInfo}/>
      <StyleSelector />
      <AddToCart />
      <ProductDescription />
    </div>
  );
}