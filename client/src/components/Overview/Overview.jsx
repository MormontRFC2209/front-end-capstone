import {useState, useEffect} from "react";
import axios from 'axios';

import ImageGallery from './ImageGallery.jsx';
import ProductHeading from './ProductHeading.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductDescription from './ProductDescription.jsx';

export default function Overview({ productId }) {
  const [productInfo, setProductInfo] = useState([]);
  const [styles, setStyles] = useState([]);

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
    if (productId > 0) {
      getProductInfo()
        .catch((err) => console.log(err))
    }
  }, [productId])

  useEffect(() => {
    if (productId > 0) {
      getStyles()
        .catch((err) => console.log(err))
    }
  }, [productId])

  return (
    <div>
      <ImageGallery />
      <ProductHeading productInfo={productInfo}/>
      <StyleSelector />
      <AddToCart />
      <ProductDescription productInfo={productInfo}/>
    </div>
  );
}