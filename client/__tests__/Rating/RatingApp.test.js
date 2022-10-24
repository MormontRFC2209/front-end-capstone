import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import RANDR from '../../src/components/Rating/RR.jsx';
import { productId, productName, avgRating, totalReviews,reviews, reviewMetaData} from "./fakeRatingData.js";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe('Overview RANDR', () => {
  const props = {
    handleClick: '() -> {}',
    productName: productName,
    productId: productId,
    // 'avgRating': avgRating,
    // 'numReviews': numReviews,
    // styles: styles,
  };
  test('It reders RANDR', () => {
    const wrapper = shallow(<RANDR {...props}/>);
    expect(wrapper.exists()).toBe(true);
  });
    it('renders one <ProductInfo /> component', () => {
    const wrapper = shallow(<RANDR {...props} />);
    expect(wrapper.find(productId)).toBe(66648);
  });
});