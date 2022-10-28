import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import RANDR from '../../src/components/Rating/RR.jsx';
import ReviewList from "../../src/components/Rating/reviewList/reviewList.jsx";
import BreakDown from '../../src/components/Rating/reviewBreakDown/breakDown.jsx';

import { productId, productName, avgRating, totalReviews,reviews, reviewMetaData} from "./fakeRatingData.js";

configure({ adapter: new Adapter() });

describe('Overview RANDR', () => {
  function fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hello world')
      }, 1000);
    })
  }
  const props = {
    handleClick: '() -> {}',
    productName: productName,
    productId: productId,
    'avgRating': avgRating,
    'numReviews': totalReviews,
    reviews: reviews,
    reviewMetaData:reviewMetaData
  };
  test('It reders RANDR', () => {
    const wrapper = shallow(<RANDR {...props}/>);
    expect(wrapper.exists()).toBe(true);
  });
    it('renders one <ReviewList /> component', () => {
    const wrapper = shallow(<RANDR {...props} />);
    // return fetchData().then(data => {
    //   const wrapper = shallow(<RANDR {...props} />)
    //   return wrapper;
    // }).then(result=>expect(result.find(ReviewList).length).toBe(1));
    expect(wrapper.find(ReviewList).length).toBe(1);
  });
});