import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Inicialización del carrito desde localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('pms_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Persistencia del carrito en localStorage
  useEffect(() => {
    localStorage.setItem('pms_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (newItem) => {
    setCartItems(prev => {
      const key = `${newItem.codigo}-${newItem.size || ''}-${newItem.note || ''}`;
      const existingIndex = prev.findIndex(item =>
        `${item.codigo}-${item.size || ''}-${item.note || ''}` === key
      );

      if (existingIndex >= 0) {
        // Incrementar cantidad si el item existe
        const updated = [...prev];
        updated[existingIndex].qty += newItem.qty;
        return updated;
      } else {
        // Agregar nuevo item al carrito
        return [...prev, newItem];
      }
    });
  };

  const handleUpdateQuantity = (index, newQty) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].qty = Math.max(1, newQty);
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="App" style={{backgroundColor: '#FFF5E1', minHeight: '100vh'}}>
      <Header
        cartCount={cartCount}
        onCartOpen={() => setShowCart(true)}
      />

      <ProductGrid
        onAddToCart={handleAddToCart}
      />

      <Cart
        show={showCart}
        onHide={() => setShowCart(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

export default App;
