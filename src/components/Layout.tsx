import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Tractor, 
  Warehouse,
  Wallet,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { isUserAdmin, getUserProfile } from '../lib/firebase';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isUserAdmin(user.uid);
        setIsAdmin(adminStatus);
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      }
    };
    checkAdminStatus();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingCart },
    { name: 'Members', href: '/members', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Farm Management', href: '/farm', icon: Tractor },
    { name: 'Storage', href: '/storage', icon: Warehouse },
    { name: 'Accounts', href: '/accounts', icon: Wallet },
    ...(isAdmin ? [{ name: 'Admin', href: '/admin', icon: Settings }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="w-auto h-8"
                  src="https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=32&h=32&fit=crop&crop=center"
                  alt="FPO Platform"
                />
                <h1 className="ml-3 text-xl font-semibold text-gray-800">FPO Platform</h1>
              </div>
              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`${
                          location.pathname === item.href
                            ? 'bg-green-50 text-green-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              
              {/* User Profile Section */}
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div className="inline-block h-9 w-9 rounded-full overflow-hidden bg-gray-100">
                      {userProfile?.photoURL ? (
                        <img
                          src={userProfile.photoURL}
                          alt={userProfile.displayName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-green-100">
                          <User className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 relative">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        {userProfile?.displayName || user?.email}
                      </p>
                      <p className="text-xs font-medium text-gray-500">
                        {userProfile?.role || 'Member'}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="ml-auto flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;