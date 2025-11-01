import React from 'react';
import './ProductList.css';

const ProductList = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <h3>No products found</h3>
        <p>Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
            <span className="product-category">{product.category}</span>
          </div>
          <div className="product-info">
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-footer">
              <div className="product-price">Rp {product.price.toLocaleString()}</div>
              <button
                onClick={() => onAddToCart(product)}
                className="add-to-cart-btn"
              >
                ➕ Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;