// Update the products array at the top of the file to include more items:

const products = [
  {
    id: '1',
    name: 'Organic Wheat',
    category: 'Grains',
    price: 2400,
    quantity: 100,
    unit: 'quintal',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
    seller: 'ABC FPO',
  },
  {
    id: '2',
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    price: 40,
    quantity: 500,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop',
    seller: 'XYZ Farmers',
  },
  // Add more products...
  {
    id: '3',
    name: 'Premium Rice Seeds',
    category: 'Seeds',
    price: 1200,
    quantity: 50,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
    seller: 'Seeds Corp',
  },
  {
    id: '4',
    name: 'NPK Fertilizer',
    category: 'Fertilizers',
    price: 850,
    quantity: 200,
    unit: 'bag',
    image: 'https://images.unsplash.com/photo-1533484211272-98ffb5a6f0e4?w=400&h=300&fit=crop',
    seller: 'Agro Chemicals Ltd',
  },
  // Add more products as needed...
];

// Update the handleAddToCart function in the Marketplace component:

const handleAddToCart = (product: any) => {
  dispatch({
    type: 'ADD_ITEM',
    payload: {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      unit: product.unit,
      seller: product.seller
    }
  });
  toast.success(`${product.name} added to cart`);
};

// Make sure to add the onClick handler to the "Add to Cart" button:

<button 
  onClick={() => handleAddToCart(product)}
  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
>
  Add to Cart
</button>

export default handleAddToCart