import {useState, useEffect} from "react";
import AvgRating from "./AvgRating.jsx";

export default function ProductHeading({ productInfo, styles, selectedStyleId, reviews, trackingFunction }) {
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const [avgStarCount, setAvgStarCount] = useState(0);

  const calcAverageStars = () => {
    if (reviews.length !== 0) {
      let totalStars = 0;
      let totalReviews = 0;
      for (i = 1; i <= 5; i++) {
        if (Number(reviews.ratings[i])) {
          console.log(i + " reviews " + Number(reviews.ratings[i]));
          totalStars += i * Number(reviews.ratings[i]);
          totalReviews += Number(reviews.ratings[i]);
        }
      }
      setNumberOfReviews(totalReviews);
      setAvgStarCount(totalStars/totalReviews);
    }
  };

  useEffect(() => {
    calcAverageStars();
  }, [reviews]);


  return (
    <div>
      {numberOfReviews !== 0 &&
        <div id="rating-star-view">
          <AvgRating avgRating={avgStarCount} trackingFunction={trackingFunction}/>
          <a id="reviews-link" className="overview" href="#ratings-reviews-section">Read All {numberOfReviews} Reviews</a>
        </div>
      }
      <h4 id="category" className="overview" onClick={trackingFunction}>{productInfo[0].category}</h4>
      <h2 id="product-name" className="overview" onClick={trackingFunction}>{productInfo[0].name}</h2>
      {styles[selectedStyleId].sale_price === null &&
        <div id="original-price" className="overview" onClick={trackingFunction}>${styles[selectedStyleId].original_price}</div>
      }
      {styles[selectedStyleId].sale_price !== null &&
        <div id="sales-price" className="overview" onClick={trackingFunction}>
          <div id="red-sales-price" className="overview" style={{color: "red"}}>${styles[selectedStyleId].sale_price}</div>
          <div id="og-price-struckthru" className="overview" style={{textDecoration: "line-through"}}>${styles[selectedStyleId].original_price}</div>
        </div>
      }
    </div>
  );
};