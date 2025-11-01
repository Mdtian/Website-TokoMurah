// Simulate payment processing
export const processPayment = async (paymentData) => {
  console.log('Processing payment:', paymentData);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 85% success rate
      if (Math.random() > 0.15) {
        resolve({ 
          success: true, 
          transactionId: 'TRX-' + Date.now(),
          method: paymentData.method,
          amount: paymentData.amount,
          timestamp: new Date().toISOString()
        });
      } else {
        reject(new Error('Payment processing failed. Please try again.'));
      }
    }, 2000);
  });
};

// Simulate QRIS payment verification
export const verifyQRISPayment = async (transactionId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        verified: true,
        transactionId,
        status: 'completed'
      });
    }, 3000);
  });
};