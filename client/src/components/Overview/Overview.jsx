import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";

const DefaultImageGallery = lazy(() => import("./ImageGallery/DefaultImageGallery.jsx"));
const ProductHeading = lazy(() => import("./ProductHeading/ProductHeading.jsx"));
const StyleSelector = lazy(() => import("./StyleSelector/StyleSelector.jsx"));
const AddToCart = lazy(() => import("./AddToCart/AddToCart.jsx"));
const ProductDescription = lazy(() => import("./ProductDescription/ProductDescription.jsx"));
const ShareMedia = lazy(() => import("./ShareMedia/ShareMedia.jsx"));

export default function Overview({ productId, reviews, trackingFunction, setProductName }) {
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
  useEffect(() => {
    if(productInfo.length > 0) {
      setProductName(productInfo[0].name)
    }
  })

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
          <Suspense fallback={renderLoader()}>
            <DefaultImageGallery styles={styles} selectedStyleId={selectedStyleId} trackingFunction={trackingFunction}/>
          </Suspense>
        </div>
        <div id="right-product-overview">
          <Suspense fallback={renderLoader()}>
            <ProductHeading productInfo={productInfo} styles={styles} selectedStyleId={selectedStyleId} reviews={reviews} trackingFunction={trackingFunction}/>
          </Suspense>
          <Suspense fallback={renderLoader()}>
            <StyleSelector styles={styles} selectedStyleId={selectedStyleId} selectedStylePosition={selectedStylePosition} clickStyle={clickStyle} trackingFunction={trackingFunction}/>
            </Suspense>
          <Suspense fallback={renderLoader()}>
            <AddToCart styles={styles} selectedStyleId={selectedStyleId} trackingFunction={trackingFunction}/>
          </Suspense>
          <Suspense fallback={renderLoader()}>
            <ShareMedia styles={styles} selectedStyleId={selectedStyleId} trackingFunction={trackingFunction}/>
          </Suspense>
        </div>
      </div>
      <Suspense fallback={renderLoader()}>
        <ProductDescription productInfo={productInfo} trackingFunction={trackingFunction}/>
      </Suspense>
    </div>
  );
}