import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import App from '../src/components/App.jsx';
import axios from 'axios';


axios.defaults.baseURL='http://localhost:3000';


describe('Jest Workshop', function() {
  const user = userEvent.setup();

  it('should render the App', () => {
    render(<App />)
    return waitFor(() => expect(screen.queryByText(/Loading/)).not.toBeInTheDocument())
      .then(() => {
        console.log('hello')
      })
  })
})