import { useState, useEffect } from "react";
import axios from "axios";

export default function AddToCart({ styles, selectedStyleId }) {
  const [skus, setSkus] = useState([]);
  const [selectSize, setSelectSize] = useState("Select Size");
  const [selectSizeAfterClick, setSelectSizeAfterClick] = useState(false);
  const [selectQuantity, setSelectQuantity] = useState("1");
  const [visibleOptions, setVisibleOptions] = useState(1);

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
    return Promise.all(postPromises)
      .then(() => console.log("posted all to cart"))
      .catch((err) => console.log(err))
  };

  const clickWithoutSize = (e) => {
    setSelectSizeAfterClick(true);
    setVisibleOptions(Object.keys(skus[0]).length + 1);
  };

  useEffect(() => {
    makeSkuArray();
    setSelectSize("Select Size");
    let $select = document.querySelector(".size");
    if ($select) {
      $select.value = "Select Size";
    }
  }, [selectedStyleId]);

  useEffect(() => {
    setSelectSizeAfterClick(false);
    setVisibleOptions(1);
  }, [selectSize]);

  return (
    <div id="add-to-cart-container" className="overview">
      {!styles[selectedStyleId].skus.null && skus.length > 0 && selectSizeAfterClick &&
        <div id="select-size-warning" className="overview">Please Select Size</div>
      }
      <div id="dropdown-container" className="overview">
        {styles[selectedStyleId].skus.null &&
          <select className="overview size" disabled>
            <option>OUT OF STOCK</option>
          </select>
        }
        {!styles[selectedStyleId].skus.null && skus.length > 0 &&
          <select id="size-selector" className="overview size" size={visibleOptions} onChange={(e) => setSelectSize(e.target.value)}>
            <option>Select Size</option>
            {Object.keys(skus[0]).map((sku, i) => {
              return (<option key={i} value={sku}>{skus[0][sku].size}</option>)
            })}
          </select>
        }
        {selectSize === "Select Size" &&
          <select className="overview quantity" disabled>
            <option> - </option>
          </select>
        }
        {selectSize !== "Select Size" &&
          <select id="quantity-selector" className="overview quantity" onChange={(e) => setSelectQuantity(e.target.value)}>
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