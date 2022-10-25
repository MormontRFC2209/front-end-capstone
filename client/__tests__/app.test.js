import React from 'react';
// import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/components/App.jsx';

describe('Overview Tests', function() {
  const user = userEvent.setup();

  it('should display product name', function() {
    render(<App />);
    const productName = screen.getByTestId('product-name');
    expect(productName).toEqual('Heir Force Ones');
  });
});