import { useState, useEffect } from "react";
import axios from "axios";

export default function AddToCart({ styles, selectedStyleId, trackingFunction }) {
  const [skus, setSkus] = useState([]);
  const [selectSize, setSelectSize] = useState("Select Size");
  const [selectSizeAfterClick, setSelectSizeAfterClick] = useState(false);
  const [selectQuantity, setSelectQuantity] = useState("1");
  // const [visibleOptions, setVisibleOptions] = useState(1);
  const [sizeExpanded, setSizeExpanded] = useState(false);

  const makeSkuArray = () => {
    setSkus([styles[selectedStyleId].skus]);
  };

  const createQuantityArray = (quantity) => {
    let countingNums = [];
    for (let j = 1; j <= quantity; j++) {
      if (j <= 15) {
        countingNums.push(j);
      }
    }
    return countingNums;
  };

  const postToCart = () => {
    return axios.post("/info", {sku_id: selectSize}, {params: {route: "/cart"}})
      .catch((err) => console.log(err))
  };

  const clickWithSize = (e) => {
    let count = 0;
    let postPromises = [];
    while (count < Number(selectQuantity)) {
      postPromises.push(postToCart());
      count++;
    }
    trackingFunction(e);
    return Promise.all(postPromises)
      .then(() => console.log('posted to cart'))
      .catch((err) => console.log(err))
  };

  const clickWithoutSize = (e) => {
    setSelectSizeAfterClick(true);
    // setVisibleOptions(Object.keys(skus[0]).length + 1);
    setSizeExpanded(true);
    trackingFunction(e);
  };

  useEffect(() => {
    makeSkuArray();
    setSelectSize("Select Size");
    let $select = document.querySelector("#size-selector");
    if ($select) {
      $select.value = "Select Size";
    }
  }, [selectedStyleId]);

  useEffect(() => {
    setSelectSizeAfterClick(false);
    // setVisibleOptions(1);
  }, [selectSize]);

  useEffect(() => {
    let $select = document.querySelector("#size-selector");
    if ($select) {
      $select.value = selectSize;
    }
  }, [sizeExpanded]);

  return (
    <div id="add-to-cart-container">
      {!styles[selectedStyleId].skus.null && skus.length > 0 && selectSizeAfterClick &&
        <div id="select-size-warning" className="overview" onClick={trackingFunction}>Please Select Size</div>
      }
      <div id="dropdown-container">
        {styles[selectedStyleId].skus.null &&
          <select className="size" disabled>
            <option> OUT OF STOCK </option>
          </select>
        }
        {!styles[selectedStyleId].skus.null && skus.length > 0 && !sizeExpanded &&
          <select id="size-selector" className="overview size" onClick={trackingFunction} onChange={(e) => setSelectSize(e.target.value)}>
            <option className="overview size-option">Select Size</option>
            {Object.keys(skus[0]).map((sku, i) => {
              return (<option className="overview size-option" key={i} value={sku}>{skus[0][sku].size}</option>)
            })}
          </select>
        }
        {!styles[selectedStyleId].skus.null && skus.length > 0 && sizeExpanded &&
          <select id="size-selector-expanded" className="overview size" onClick={trackingFunction} size={Object.keys(skus[0]).length + 1} onChange={(e) => {
            setSelectSize(e.target.value);
            setSizeExpanded(false);
            }}>
            <option className="overview size-option">Select Size</option>
            {Object.keys(skus[0]).map((sku, i) => {
              return (<option className="overview size-option" key={i} value={sku}>{skus[0][sku].size}</option>)
            })}
          </select>
        }
        {selectSize === "Select Size" &&
          <select className="quantity" disabled>
            <option> - </option>
          </select>
        }
        {selectSize !== "Select Size" &&
          <select id="quantity-selector" className="overview quantity" onClick={trackingFunction} onChange={(e) => setSelectQuantity(e.target.value)}>
            {createQuantityArray(skus[0][selectSize].quantity).map((num, j) => {
              return <option key={j}>{num}</option>
            })}
          </select>
        }
      </div>
      {selectSize !== "Select Size" &&
        <button className="overview add-to-cart-btn" onClick={clickWithSize}> Add to Cart </button>
      }
      {!styles[selectedStyleId].skus.null && selectSize === "Select Size" &&
        <button className="overview add-to-cart-btn" onClick={clickWithoutSize}> Add to Cart </button>
      }
    </div>
  );
};