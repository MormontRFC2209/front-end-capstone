import {useState, useEffect} from "react";
import axios from 'axios';

import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ProductHeading from './ProductHeading/ProductHeading.jsx';
import StyleSelector from './StyleSelector/StyleSelector.jsx';
import AddToCart from './AddToCart/AddToCart.jsx';
import ProductDescription from './ProductDescription/ProductDescription.jsx';
import ShareMedia from './ShareMedia/ShareMedia.jsx';

export default function Overview({ productId }) {
  const [loadingProductInfo, setLoadingProductInfo] = useState(true);
  const [loadingStyles, setLoadingStyles] = useState(true);
  const [productInfo, setProductInfo] = useState([]);
  const [styles, setStyles] = useState([]);
  const [selectedStyleId, setSelectedStyleId] = useState(0);
  const [selectedStylePosition, setSelectedStylePosition] = useState({rowKey: 0, styleKey: 0});

  const getProductInfo = () => {
    return axios.get("/info", {params: {route: `/products/${productId}`}})
      .then((response) => setProductInfo([response.data]))
      .catch((err) => console.log(err))
  };

  const getStyles = () => {
    return axios.get("/info", {params: {route: `/products/${productId}/styles`}})
      .then((response) => setStyles(response.data.results))
      .catch((err) => console.log(err))
  };

  const clickStyle = (rowKey, styleKey) => {
    setSelectedStylePosition({rowKey, styleKey});
    setSelectedStyleId(rowKey * 4 + styleKey);
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
      <ImageGallery styles={styles} selectedStyleId={selectedStyleId}/>
      <ProductHeading productInfo={productInfo} styles={styles} selectedStyleId={selectedStyleId}/>
      <StyleSelector styles={styles} selectedStyleId={selectedStyleId} selectedStylePosition={selectedStylePosition} clickStyle={clickStyle}/>
      <AddToCart styles={styles} selectedStyleId={selectedStyleId}/>
      <ShareMedia styles={styles} selectedStyleId={selectedStyleId}/>
      <ProductDescription productInfo={productInfo}/>
    </div>
  );
}