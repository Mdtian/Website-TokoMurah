import React from 'react';
import './Cart.css';

const Cart = ({ cart, onUpdateQuantity, onRemoveItem, onCheckout, onBack }) => {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cart.length === 0) {
    return (
      <div className="cart">
        <div className="cart-empty">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some delicious items from our menu</p>
          <button onClick={onBack} className="back-btn">
            🍽️ Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <button onClick={onBack} className="back-btn">
        ← Back to Menu
      </button>
      
      <h2>Your Order</h2>
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            
            <div className="item-info">
              <h4>{item.name}</h4>
              <p className="item-category">{item.category}</p>
              <p className="item-price">Rp {item.price.toLocaleString()}</p>
            </div>
            
            <div className="quantity-controls">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="quantity-btn"
              >
                −
              </button>
              <span className="quantity">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
            
            <div className="item-total">
              Rp {(item.price * item.quantity).toLocaleString()}
            </div>
            
            <button
              onClick={() => onRemoveItem(item.id)}
              className="remove-btn"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="total">
          <strong>Total: Rp {getTotalPrice().toLocaleString()}</strong>
        </div>
        <button onClick={onCheckout} className="checkout-btn">
          💳 Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;