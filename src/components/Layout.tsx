import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Tractor, 
  Warehouse,
  Wallet,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { isUserAdmin } from '../lib/firebase';

const Layout: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isUserAdmin(user.uid);
        setIsAdmin(adminStatus);
      }
    };
    checkAdminStatus();
  }, [user]);

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
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <button className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        Logout
                      </p>
                    </div>
                    <LogOut className="ml-auto h-5 w-5 text-gray-400" />
                  </div>
                </button>
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