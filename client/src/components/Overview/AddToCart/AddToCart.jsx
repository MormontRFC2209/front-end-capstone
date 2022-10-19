import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddToCart({ styles, selectedStyleId }) {
  const [skus, setSkus] = useState([]);
  const [selectSize, setSelectSize] = useState('Select Size');
  const [selectSizeAfterClick, setSelectSizeAfterClick] = useState(false);
  const [selectQuantity, setSelectQuantity] = useState('1');

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
    return axios.post("/info", {sku_id: selectSize}, {params: {route: '/cart'}})
      .catch((err) => console.log(err))
  };

  const clickWithSize = (e) => {
    console.log('sku of item added to cart:', selectSize);
    let count = 0;
    let postPromises = [];
    while (count < Number(selectQuantity)) {
      postPromises.push(postToCart());
      count++;
    }
    return Promise.all(postPromises)
      .then(() => console.log('posted all to cart'))
      .catch((err) => console.log(err))
  };

  const clickWithoutSize = (e) => {
    setSelectSizeAfterClick(true);
  };

  useEffect(() => {
    makeSkuArray();
    setSelectSize('Select Size');
    let $select = document.querySelector('.size');
    if ($select) {
      $select.value = 'Select Size';
    }
  }, [selectedStyleId]);

  useEffect(() => {
    setSelectSizeAfterClick(false);
  }, [selectSize]);

  return (
    <div className='addToCart-container'>
      <div className='dropdown-container'>
        {styles[selectedStyleId].skus.null &&
          <select className='addToCart-selectSize' disabled>
            <option>OUT OF STOCK</option>
          </select>
        }
        {!styles[selectedStyleId].skus.null && skus.length > 0 && selectSizeAfterClick &&
          <div>Please Select Size</div>
        }
        {!styles[selectedStyleId].skus.null && skus.length > 0 &&
          <select className='size addToCart-selectSize' onChange={(e) => setSelectSize(e.target.value)}>
            <option>Select Size</option>
            {Object.keys(skus[0]).map((sku, i) => {
              return (<option key={i} value={sku}>{skus[0][sku].size}</option>)
            })}
          </select>
        }
        {selectSize === 'Select Size' &&
          <select className='addToCart-selectQuant' disabled>
            <option> - </option>
          </select>
        }
        {selectSize !== 'Select Size' &&
          <select className='quantity addToCart-selectQuant' onChange={(e) => setSelectQuantity(e.target.value)}>
            {createQuantityArray(skus[0][selectSize].quantity).map((num, j) => {
              return <option key={j}>{num}</option>
            })}
          </select>
        }
      </div>
      {selectSize !== 'Select Size' &&
        <button className='addToCart-btn' onClick={clickWithSize}> Add to Cart </button>
      }
      {!styles[selectedStyleId].skus.null && selectSize === 'Select Size' &&
        <button className='addToCart-btn' onClick={clickWithoutSize}> Add to Cart </button>
      }
    </div>
  );
};