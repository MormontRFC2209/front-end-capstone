import react from 'react';

export default function ProductHeading({ productInfo }) {
  return (
    <div>
      {productInfo.length > 0 &&
        <div>
          <h4>{productInfo[0].category}</h4>
          <h2>{productInfo[0].name}</h2>
        </div>
      }
    </div>
  );
};