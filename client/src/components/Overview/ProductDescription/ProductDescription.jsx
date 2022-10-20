import react from 'react';

export default function ProductDescription({ productInfo }) {
  return (
    <div>
      {productInfo[0].description &&
        <div className='product-description-container'>
          <div className='slogan-description'>
            <h4>{productInfo[0].slogan}</h4>
            <div className='product-description'>{productInfo[0].description}</div>
          </div>
          <div className='vertical-line'></div>
          <ul>{productInfo[0].features.map((feature, i) => {
            return <li key={i}> {feature.feature}: {feature.value}</li>
          })}</ul>
        </div>
      }
    </div>
  );
};