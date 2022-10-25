import react from "react";

export default function ProductDescription({ productInfo }) {
  return (
    <div>
      {productInfo[0].description &&
        <div id="product-description-container" className="overview">
          <div id="slogan-description" className="overview">
            <h4 id="slogan" className="overview">{productInfo[0].slogan}</h4>
            <div id="product-description" className="overview">{productInfo[0].description}</div>
          </div>
          <div id="vertical-line" className="overview"></div>
          <ul id="features-view" className="overview">
            {productInfo[0].features.map((feature, i) => {
              return <li className="overview feature" key={i}> {feature.feature}: {feature.value}</li>
            })}
          </ul>
        </div>
      }
    </div>
  );
};