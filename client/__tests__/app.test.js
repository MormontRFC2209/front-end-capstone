import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import ProductHeading from '../src/components/Overview/ProductHeading/ProductHeading.jsx';

describe('Overview Tests', function() {
  const user = userEvent.setup();

  it('should display product name', function() {
    const productName = screen.getByType('h4');
    expect(productName).toEqual('Heir Force Ones');
  });
});