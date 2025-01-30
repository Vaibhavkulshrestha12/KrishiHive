import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isUserAdmin, updateProductPrice, updateWeatherData } from '../lib/firebase';
import { Settings, Users, Package, AlertTriangle, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isUserAdmin(user.uid);
        setIsAdmin(adminStatus);
      }
    };
    checkAdminStatus();
  }, [user]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Access Denied</h2>
          <p className="mt-1 text-sm text-gray-500">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const handlePriceUpdate = async (productId: string) => {
    try {
      await updateProductPrice(productId, newPrice);
      toast.success('Price updated successfully');
      setEditingProduct(null);
    } catch (error) {
      toast.error('Failed to update price');
    }
  };

  const tabs = [
    { id: 'products', name: 'Products', icon: Package },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage products, users, and system settings
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  ${activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                `}
              >
                <Icon className={`
                  ${activeTab === tab.id ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'}
                  -ml-0.5 mr-2 h-5 w-5
                `} />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Panels */}
      <div className="mt-8">
        {activeTab === 'products' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {Object.values(products).flat().map((product) => (
                <li key={product.id}>
                  <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {editingProduct === product.id ? (
                        <>
                          <input
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(Number(e.target.value))}
                            className="w-24 px-2 py-1 border rounded-md mr-2"
                          />
                          <button
                            onClick={() => handlePriceUpdate(product.id)}
                            className="p-1 text-green-600 hover:text-green-700"
                          >
                            <Save className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="p-1 text-red-600 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-medium text-gray-900 mr-4">
                            ₹{product.price}/{product.unit}
                          </span>
                          <button
                            onClick={() => {
                              setEditingProduct(product.id);
                              setNewPrice(product.price);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-500"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {/* User management interface */}
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">User Management</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>User management interface coming soon.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {/* Settings interface */}
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">System Settings</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>System settings interface coming soon.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;