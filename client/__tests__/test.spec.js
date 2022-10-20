import renderer from 'react-test-renderer';
import QANDA from '../src/components/Q&A/Q&A.jsx'
import Adapter from 'enzyme-adapter-react-16';
// React 16 Enzyme adapter
configure({ adapter: new Adapter() });
import { shallow, render, mount, configure } from 'enzyme';


test('Should pull questions from API', () => {
  shallow(<QANDA/>)

});