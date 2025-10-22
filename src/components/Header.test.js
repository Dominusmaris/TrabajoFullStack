import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header Component', () => {
  it('1. Debería renderizar el nombre de la pastelería correctamente', () => {
    render(<Header cartCount={0} onCartOpen={() => {}} />);
    expect(screen.getByText('Pastelería 1000 Sabores')).toBeInTheDocument();
  });

  it('2. Debería mostrar el contador del carrito correctamente', () => {
    render(<Header cartCount={5} onCartOpen={() => {}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('3. Debería llamar a onCartOpen cuando se hace clic en el botón del carrito', () => {
    const mockCartOpen = jest.fn();
    render(<Header cartCount={0} onCartOpen={mockCartOpen} />);

    const cartButton = screen.getByRole('button', { name: /carrito/i });
    fireEvent.click(cartButton);

    expect(mockCartOpen).toHaveBeenCalledTimes(1);
  });
});