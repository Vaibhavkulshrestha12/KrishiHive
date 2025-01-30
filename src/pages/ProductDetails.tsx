import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = React.useState(1);

  // In a real app, fetch this from Firebase
  const product = {
    id: '1',
    name: 'Organic Wheat',
    category: 'Grains',
    price: 2400,
    quantity: 100,
    unit: 'quintal',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop',
    seller: 'ABC FPO',
    description: 'Premium quality organic wheat grown using sustainable farming practices. Perfect for making whole wheat flour, bread, and other baked goods.',
    specifications: [
      { label: 'Type', value: 'Organic' },
      { label: 'Grade', value: 'Premium' },
      { label: 'Harvest', value: 'Fresh' },
      { label: 'Origin', value: 'Local Farmers' },
    ]
  };

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        unit: product.unit,
        seller: product.seller
      }
    });
    toast.success('Added to cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Marketplace
      </button>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col">
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">₹{product.price}/{product.unit}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <h3 className="text-sm text-gray-600">Quantity:</h3>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="ml-3 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                {[1, 2, 5, 10, 20].map((q) => (
                  <option key={q} value={q}>
                    {q} {product.unit}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={addToCart}
              className="mt-8 w-full bg-green-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-sm font-medium text-gray-900">Specifications</h2>
            <div className="mt-4 prose prose-sm text-gray-500">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {product.specifications.map((spec) => (
                    <tr key={spec.label}>
                      <td className="py-4 text-sm font-medium text-gray-900">{spec.label}</td>
                      <td className="py-4 text-sm text-gray-500">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails