import react from 'react';

export default function ProductHeading({ productInfo, styles, selectedStyleId }) {
  return (
    <div>
      <h4>{productInfo[0].category}</h4>
      <h2 className='product-name'>{productInfo[0].name}</h2>
      {styles[selectedStyleId].sale_price === null &&
        <div className='price'>${styles[selectedStyleId].original_price}</div>
      }
      {styles[selectedStyleId].sale_price !== null &&
        <div className='price'>
          <div style={{color: 'red'}}>${styles[selectedStyleId].sale_price}</div>
          <div style={{textDecoration: 'line-through'}}>${styles[selectedStyleId].original_price}</div>
        </div>
      }
    </div>
  );
};