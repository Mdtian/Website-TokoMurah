import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import { searchProducts } from '../services/api';
import './ProductSearch.css';

const ProductSearch = ({ onAddToCart, onCheckout }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await searchProducts('');
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-search">
      <div className="search-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Loading menu...</div>
      ) : (
        <ProductList
          products={filteredProducts}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
};

export default ProductSearch;