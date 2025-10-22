import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('App Integration Tests', () => {
  it('11. Header debería mostrar el badge de "50 años"', () => {
    render(<Header cartCount={0} onCartOpen={() => {}} />);
    expect(screen.getByText('50 años')).toBeInTheDocument();
  });
});