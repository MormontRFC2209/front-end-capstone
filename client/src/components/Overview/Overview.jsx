import {useState, useEffect} from "react";
import axios from 'axios';

import ImageGallery from './ImageGallery.jsx';
import ProductHeading from './ProductHeading.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductDescription from './ProductDescription.jsx';
import ShareMedia from './ShareMedia.jsx';

export default function Overview({ productId }) {
  const [loadingProductInfo, setLoadingProductInfo] = useState(true);
  const [loadingStyles, setLoadingStyles] = useState(true);
  const [productInfo, setProductInfo] = useState([]);
  const [styles, setStyles] = useState([]);
  const [selectedStyleId, setSelectedStyleId] = useState(0);

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
    getProductInfo()
      .then(() => setLoadingProductInfo(false))
      .catch((err) => console.log(err))
  }, [productId]);

  useEffect(() => {
    getStyles()
      .then(() => setLoadingStyles(false))
      .catch((err) => console.log(err))
  }, [productId]);

  if (loadingProductInfo || loadingStyles) {
    return (<div> Loading Your Product! </div>)
  }

  return (
    <div>
      <ImageGallery />
      <ProductHeading productInfo={productInfo}/>
      <StyleSelector styles={styles}/>
      <AddToCart />
      <ShareMedia />
      <ProductDescription productInfo={productInfo}/>
    </div>
  );
}