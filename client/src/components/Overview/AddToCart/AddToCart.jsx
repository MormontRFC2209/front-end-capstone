import { useState, useEffect } from 'react';

export default function AddToCart({ styles, selectedStyleId }) {
  const [skus, setSkus] = useState([]);
  const [selectSize, setSelectSize] = useState('');
  const [selectQuantity, setSelectQuantity] = useState('');

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

  const clickWithSize = (e) => {
    console.log('will add to cart');
  };

  const clickWithoutSize = (e) => {
    console.log('will drop size dropdown menu');
  };

  useEffect(() => {
    makeSkuArray();
  }, [selectedStyleId]);

  return (
    <div>
      {styles[selectedStyleId].skus.null &&
        <select name='size' disabled>
          <option>OUT OF STOCK</option>
        </select>
      }
      {!styles[selectedStyleId].skus.null && skus.length > 0 &&
        <select name='size' onChange={(e) => setSelectSize(e.target.value)}>
          <option>Select Size</option>
          {Object.keys(skus[0]).map((sku, i) => {
            return (<option key={i} value={sku}>{skus[0][sku].size}</option>)
          })}
        </select>
      }
      {(selectSize === '' || selectSize === 'Select Size') &&
        <select name='quantity' disabled>
          <option> - </option>
        </select>
      }
      {selectSize !== '' && selectSize !== 'Select Size' &&
        <select name='quantity' onChange={(e) => setSelectQuantity(e.target.value)}>
          {createQuantityArray(skus[0][selectSize].quantity).map((num, j) => {
            return <option key={j}>{num}</option>
          })}
        </select>
      }
      {selectSize !== '' && selectSize !== 'Select Size' && selectQuantity !== '' &&
        <button onClick={clickWithSize}> Add to Cart </button>
      }
      {(selectSize === '' || selectSize === 'Select Size') &&
        <button onClick={clickWithoutSize}> Add to Cart </button>
      }
    </div>
  );
};