import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { QRCodeSVG } from 'qrcode.react';
import { processPayment } from '../services/paymentService';
import './Checkout.css';

const Checkout = ({ cart, totalPrice, onBack, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQRISPayment = async () => {
    setShowQR(true);
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      try {
        await processPayment({
          method: 'qris',
          amount: totalPrice,
          items: cart
        });
        setPaymentStatus('success');
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } catch (error) {
        setPaymentStatus('error');
        setIsProcessing(false);
      }
    }, 5000);
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: (totalPrice / 14000).toFixed(2) // Convert to USD
        },
        description: `Restaurant Order - ${cart.length} items`
      }]
    });
  };

  const onApprove = async (data, actions) => {
    try {
      setIsProcessing(true);
      await actions.order.capture();
      await processPayment({
        method: 'paypal',
        amount: totalPrice,
        items: cart
      });
      setPaymentStatus('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      setPaymentStatus('error');
      setIsProcessing(false);
    }
  };

  const onError = (error) => {
    console.error('PayPal Error:', error);
    setPaymentStatus('error');
    setIsProcessing(false);
  };

  return (
    <div className="checkout">
      <button onClick={onBack} className="back-btn">
        ← Back to Cart
      </button>

      <h2>Checkout</h2>
      
      <div className="order-summary">
        <h3>📋 Order Summary</h3>
        {cart.map(item => (
          <div key={item.id} className="order-item">
            <span>{item.name} x {item.quantity}</span>
            <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="order-total">
          <strong>Total: Rp {totalPrice.toLocaleString()}</strong>
        </div>
      </div>

      {!paymentMethod ? (
        <div className="payment-methods">
          <h3>💳 Select Payment Method</h3>
          <div className="payment-options">
            <button
              onClick={() => setPaymentMethod('qris')}
              className="payment-btn qris-btn"
            >
              <span className="payment-icon">📱</span>
              <span>QRIS</span>
              <small>Instant Payment</small>
            </button>
            <button
              onClick={() => setPaymentMethod('paypal')}
              className="payment-btn paypal-btn"
            >
              <span className="payment-icon">🌎</span>
              <span>PayPal</span>
              <small>International</small>
            </button>
          </div>
        </div>
      ) : (
        <div className="payment-interface">
          {paymentMethod === 'qris' && !showQR && (
            <div className="qris-payment">
              <h3>📱 QRIS Payment</h3>
              <div className="payment-amount">
                <strong>Amount: Rp {totalPrice.toLocaleString()}</strong>
              </div>
              <button
                onClick={handleQRISPayment}
                className="confirm-payment-btn"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Generate QR Code'}
              </button>
            </div>
          )}

          {paymentMethod === 'qris' && showQR && (
            <div className="qris-display">
              <h3>Scan QR Code to Pay</h3>
              <div className="qris-container">
                <QRCodeSVG
                  value={`https://qris.example.com/pay?amount=${totalPrice}&order=${Date.now()}`}
                  size={200}
                  level="H"
                  includeMargin
                />
              </div>
              <p className="qris-instruction">
                Buka aplikasi mobile banking atau e-wallet Anda, 
                pilih fitur scan QR, dan arahkan kamera ke kode di atas
              </p>
              
              {isProcessing && !paymentStatus && (
                <div className="payment-processing">
                  <div className="spinner"></div>
                  <p>Menunggu pembayaran...</p>
                </div>
              )}
              
              {paymentStatus === 'success' && (
                <div className="payment-success">
                  ✅ Payment Successful!
                </div>
              )}
              {paymentStatus === 'error' && (
                <div className="payment-error">
                  ❌ Payment Failed. Please try again.
                </div>
              )}
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="paypal-payment">
              <h3>🌎 PayPal Payment</h3>
              <div className="payment-amount">
                <strong>Amount: ${(totalPrice / 14000).toFixed(2)} USD</strong>
                <small>(Rp {totalPrice.toLocaleString()})</small>
              </div>
              
              {!paymentStatus && (
                <PayPalScriptProvider
                  options={{
                    "client-id": "test", // Ganti dengan client ID yang sebenarnya
                    currency: "USD",
                    intent: "capture"
                  }}
                >
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    style={{ layout: "vertical" }}
                  />
                </PayPalScriptProvider>
              )}
              
              {isProcessing && !paymentStatus && (
                <div className="payment-processing">
                  <div className="spinner"></div>
                  <p>Processing payment...</p>
                </div>
              )}
              
              {paymentStatus === 'success' && (
                <div className="payment-success">
                  ✅ Payment Successful!
                </div>
              )}
              {paymentStatus === 'error' && (
                <div className="payment-error">
                  ❌ Payment Failed. Please try again.
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => {
              setPaymentMethod('');
              setShowQR(false);
              setPaymentStatus('');
              setIsProcessing(false);
            }}
            className="change-method-btn"
            disabled={isProcessing}
          >
            Change Payment Method
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;