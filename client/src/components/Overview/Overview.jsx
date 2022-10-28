import { useState, useEffect } from "react";
import axios from "axios";

import DefaultImageGallery from "./ImageGallery/DefaultImageGallery.jsx";
import ProductHeading from "./ProductHeading/ProductHeading.jsx";
import StyleSelector from "./StyleSelector/StyleSelector.jsx";
import AddToCart from "./AddToCart/AddToCart.jsx";
import ProductDescription from "./ProductDescription/ProductDescription.jsx";
import ShareMedia from "./ShareMedia/ShareMedia.jsx";

export default function Overview({ productId, reviews, trackingFunction }) {
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

  const renderLoader = () => {
    return (<div></div>);
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
    return (<div className='overview-load loading'></div>)
  }

  if (styles.length === 0) {
    return (<div> Product In Development </div>)
  }

  return (
    <div id="overview-view">
      {styles[0].photos[0].url &&
        <link rel="preload" as="image" href={styles[0].photos[0].url}></link>
      }
      <div id="top-product-overview">
        <div id='left-product-overview'>
          <DefaultImageGallery styles={styles} selectedStyleId={selectedStyleId} trackingFunction={trackingFunction}/>
        </div>
        <div id="right-product-overview">
          <ProductHeading productInfo={productInfo} styles={styles} selectedStyleId={selectedStyleId} reviews={reviews} trackingFunction={trackingFunction}/>
          <StyleSelector styles={styles} selectedStyleId={selectedStyleId} selectedStylePosition={selectedStylePosition} clickStyle={clickStyle} trackingFunction={trackingFunction}/>
          <AddToCart styles={styles} selectedStyleId={selectedStyleId} trackingFunction={trackingFunction}/>
          <ShareMedia styles={styles} selectedStyleId={selectedStyleId} trackingFunction={trackingFunction}/>
        </div>
      </div>
      <ProductDescription productInfo={productInfo} trackingFunction={trackingFunction}/>
    </div>
  );
}