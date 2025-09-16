import { useState } from "react";
import CheckoutForm from '../CheckoutForm';

export default function CheckoutFormExample() {
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderData, setOrderData] = useState(null);

  if (orderCompleted && orderData) {
    return (
      <div className="p-4 text-center space-y-4">
        <h3 className="text-lg font-bold text-green-600">Order Placed Successfully! 🎉</h3>
        <div className="text-sm space-y-2">
          <p><strong>Order ID:</strong> {(orderData as any).orderId}</p>
          <p><strong>Total:</strong> ${(orderData as any).total?.toFixed(2)}</p>
          <p><strong>Address:</strong> {(orderData as any).address}</p>
        </div>
        <button 
          onClick={() => {
            setOrderCompleted(false);
            setOrderData(null);
          }}
          className="px-4 py-2 text-sm bg-primary text-white rounded"
        >
          Reset Demo
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <CheckoutForm
        cartTotal={69.97} // Sample cart total
        onOrderComplete={(data) => {
          setOrderData(data);
          setOrderCompleted(true);
          console.log('Order completed:', data);
        }}
      />
    </div>
  );
}