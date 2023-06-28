import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const products = [
  { id: 1, image: 'https://m.media-amazon.com/images/I/61M7ZbTTlVL._SL1000_.jpg', price: 10 },
  { id: 2, image: 'https://m.media-amazon.com/images/I/61M7ZbTTlVL._SL1000_.jpg', price: 20 },
  { id: 3, image: 'https://m.media-amazon.com/images/I/61M7ZbTTlVL._SL1000_.jpg', price: 15 },
  // Add more products here
];

const ProductListing = ({ addToCart }) => {
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt="" className="product-image" />
            <div className="product-item-details">
              <span className="product-price">₹ {product.price}</span>
              <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Cart = ({ cartItems, removeFromCart }) => {
  const [paymentStatus, setPaymentStatus] = useState(false);

  const getTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  const handlePayNow = () => {
    setPaymentStatus(true);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt="" className="cart-image" />
                <div className="cart-item-details">
                  <div className="cart-item-info">
                    <span className="cart-item-price">₹ {item.price}</span>
                    <button
                      className="remove-from-cart-button"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>
              Total: <span className="total-price">₹ {getTotalPrice()}</span>
            </span>
            {!paymentStatus ? (
              <button className="pay-now-button" onClick={handlePayNow}>
                Cash on Delivery              </button>
            ) : (
              <div className="payment-status">
                <p>  : Cash on Delivery</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCartItems);
  };

  return (
    <Router>
      <div className="app">
        <header>
          <nav>
            <div className="nav-container">
              <Link to="/">
                <span>Puja Vegetable Store</span>
              </Link>
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>Cart ({cartItems.length})</span>
              </Link>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<ProductListing addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
