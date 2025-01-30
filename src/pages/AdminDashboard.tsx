import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isUserAdmin, updateProductPrice, updateWeatherData, db } from '../lib/firebase';
import { Settings, Users, Package, AlertTriangle, Edit2, Save, X, UserPlus, Shield, Key } from 'lucide-react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  role: string;
  displayName: string;
  createdAt: string;
  lastLogin: string;
}

interface SystemSetting {
  id: string;
  name: string;
  value: string;
  category: string;
  lastUpdated: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [activeTab, setActiveTab] = useState('products');
  const [users, setUsers] = useState<User[]>([]);
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isUserAdmin(user.uid);
        setIsAdmin(adminStatus);
        if (adminStatus) {
          await loadUsers();
          await loadSettings();
        }
      }
      setLoading(false);
    };
    checkAdminStatus();
  }, [user]);

  const loadUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const userData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as User));
      setUsers(userData);
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  const loadSettings = async () => {
    try {
      const settingsRef = collection(db, 'settings');
      const snapshot = await getDocs(settingsRef);
      const settingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as SystemSetting));
      setSettings(settingsData);
    } catch (error) {
      toast.error('Failed to load settings');
    }
  };

  const handleUserRoleUpdate = async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      toast.success('User role updated successfully');
      setEditingUser(null);
      await loadUsers();
    } catch (error) {
      toast.error('Failed to update user role');
    }
  };

  const handleSettingUpdate = async (settingId: string, newValue: string) => {
    try {
      const settingRef = doc(db, 'settings', settingId);
      await updateDoc(settingRef, {
        value: newValue,
        lastUpdated: new Date().toISOString()
      });
      toast.success('Setting updated successfully');
      await loadSettings();
    } catch (error) {
      toast.error('Failed to update setting');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        {activeTab === 'users' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">User Management</h3>
                  <p className="mt-1 text-sm text-gray-500">Manage user roles and permissions</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </button>
                </div>
              </div>
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">User</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Login</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <Users className="h-6 w-6 text-gray-500" />
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">{user.displayName}</div>
                                  <div className="text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {editingUser === user.id ? (
                                <select
                                  value={newRole}
                                  onChange={(e) => setNewRole(e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                >
                                  <option value="member">Member</option>
                                  <option value="admin">Admin</option>
                                  <option value="manager">Manager</option>
                                </select>
                              ) : (
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                }`}>
                                  {user.role}
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {new Date(user.lastLogin).toLocaleDateString()}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              {editingUser === user.id ? (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleUserRoleUpdate(user.id)}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    <Save className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => setEditingUser(null)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <X className="h-5 w-5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setEditingUser(user.id);
                                    setNewRole(user.role);
                                  }}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  Edit
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">System Settings</h3>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-900">Security Settings</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="bg-green-100 text-green-800 inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                        >
                          Enabled
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Key className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">Password Policy</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="bg-green-100 text-green-800 inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                        >
                          Strong
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-900">Notification Settings</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Email Notifications</span>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="bg-green-100 text-green-800 inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                        >
                          Enabled
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">SMS Notifications</span>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="bg-gray-100 text-gray-800 inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                        >
                          Disabled
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900">System Maintenance</h4>
                  <div className="mt-4 space-y-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Run System Diagnostics
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Backup Database
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;