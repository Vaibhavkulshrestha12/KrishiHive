import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import SellerDashboard from './pages/SellerDashboard';
import Members from './pages/Members';
import Analytics from './pages/Analytics';
import FarmManagement from './pages/FarmManagement';
import Storage from './pages/Storage';
import Accounts from './pages/Accounts';
import Auth from './pages/Auth';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AIChat from './components/AIChat';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="marketplace/:id" element={<ProductDetails />} />
              <Route path="seller" element={<SellerDashboard />} />
              <Route path="members" element={<Members />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="farm" element={<FarmManagement />} />
              <Route path="storage" element={<Storage />} />
              <Route path="accounts" element={<Accounts />} />
            </Route>
          </Routes>
          <AIChat />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;