import React from 'react';
import { useCart } from '../contexts/CartContext';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface OrderSummaryProps {
  onClose: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onClose }) => {
  const { state, dispatch } = useCart();

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: state.items,
        total: state.total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId: 'current-user-id', // Replace with actual user ID
      };

      await addDoc(collection(db, 'orders'), orderData);
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Order placed successfully!');
      onClose();
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="flow-root">
        <ul className="-my-4 divide-y divide-gray-200">
          {state.items.map((item) => (
            <li key={item.id} className="py-4 flex">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.seller}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {item.quantity} {item.unit} × ₹{item.price}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                ₹{item.price * item.quantity}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>₹{state.total}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
      </div>

      <div className="mt-6">
        <button
          onClick={handleCheckout}
          className="w-full bg-green-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Confirm Order
        </button>
        <button
          onClick={onClose}
          className="mt-3 w-full bg-white border border-gray-300 rounded-md py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;