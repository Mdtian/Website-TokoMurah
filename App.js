import React, { useState } from 'react';
import ProductSearch from './components/ProductSearch';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('search');

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <header className="app-header">
        <h1>🍽️ Resto45</h1>
        <nav>
          <button onClick={() => setCurrentView('search')}>📋 Menu</button>
          <button onClick={() => setCurrentView('cart')}>
            🛒 Cart ({cartItemCount})
          </button>
        </nav>
      </header>

      <main>
        {currentView === 'search' && (
          <ProductSearch
            onAddToCart={addToCart}
            onCheckout={() => setCurrentView('checkout')}
          />
        )}
        {currentView === 'cart' && (
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => setCurrentView('checkout')}
            onBack={() => setCurrentView('search')}
          />
        )}
        {currentView === 'checkout' && (
          <Checkout
            cart={cart}
            totalPrice={getTotalPrice()}
            onBack={() => setCurrentView('cart')}
            onSuccess={() => {
              setCart([]);
              setCurrentView('search');
              alert('Pembayaran berhasil! Terima kasih atas pesanan Anda.');
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;