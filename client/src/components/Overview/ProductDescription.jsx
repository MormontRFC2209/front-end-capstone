import react from 'react';

export default function ProductDescription({ productInfo }) {
  return (
    <div>
      { productInfo.length > 0 && productInfo[0].description &&
        <div>
          <h4>{productInfo[0].slogan}</h4>
          <div>{productInfo[0].description}</div>
          <ul>{productInfo[0].features.map((feature, i) => {
            return <li key={i}> {feature.feature}: {feature.value}</li>
          })}</ul>
        </div>
      }
    </div>
  );
};