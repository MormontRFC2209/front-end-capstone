import react from "react";

export default function ProductDescription({ productInfo, trackingFunction }) {
  return (
    <div>
      {productInfo[0].description &&
        <div id="product-description-container">
          <div id="slogan-description">
            <h4 id="slogan" className="overview" onClick={trackingFunction}>{productInfo[0].slogan}</h4>
            <div id="product-description" className="overview" onClick={trackingFunction}>{productInfo[0].description}</div>
          </div>
          <div id="vertical-line"></div>
          <ul id="features-view">
            {productInfo[0].features.map((feature, i) => {
              return <li className="overview feature" key={i} onClick={trackingFunction}> {feature.feature}: {feature.value}</li>
            })}
          </ul>
        </div>
      }
    </div>
  );
};