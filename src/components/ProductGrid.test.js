import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductGrid from './ProductGrid';

describe('ProductGrid Component', () => {
  it('4. Debería renderizar el título del catálogo', () => {
    render(<ProductGrid onAddToCart={() => {}} />);
    expect(screen.getByText('Catálogo')).toBeInTheDocument();
  });

  it('5. Debería filtrar productos por búsqueda', async () => {
    render(<ProductGrid onAddToCart={() => {}} />);

    const searchInput = screen.getByPlaceholderText(/buscar por nombre/i);
    fireEvent.change(searchInput, { target: { value: 'chocolate' } });

    await waitFor(() => {
      expect(screen.getByText('Torta Cuadrada de Chocolate')).toBeInTheDocument();
      expect(screen.getByText('Mousse de Chocolate')).toBeInTheDocument();
    });
  });

  it('6. Debería mostrar productos por defecto al cargar', () => {
    render(<ProductGrid onAddToCart={() => {}} />);

    expect(screen.getByText('Torta Cuadrada de Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Torta Circular de Vainilla')).toBeInTheDocument();
    expect(screen.getByText('Mousse de Chocolate')).toBeInTheDocument();
  });

  it('7. Debería llamar a onAddToCart cuando se hace clic en "Añadir al carrito"', () => {
    const mockAddToCart = jest.fn();
    render(<ProductGrid onAddToCart={mockAddToCart} />);

    const addButtons = screen.getAllByText('Añadir al carrito');
    fireEvent.click(addButtons[0]);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });
});