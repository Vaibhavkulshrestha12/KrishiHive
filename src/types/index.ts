export interface User {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'member' | 'buyer';
  full_name: string;
  organization?: string;
  created_at: string;
  tag: 'tech' | 'money' | 'land';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  fpo_id: string;
  category: string;
  images: string[];
  created_at: string;
}

export interface Order {
  id: string;
  buyer_id: string;
  products: Array<{
    product_id: string;
    quantity: number;
    price: number;
  }>;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  created_at: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  category: 'sales' | 'purchase' | 'salary' | 'maintenance' | 'other';
  date: string;
  member_id?: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: 'savings' | 'current' | 'loan';
  bank_name: string;
  account_number: string;
  ifsc_code: string;
}

export interface MarketPrice {
  id: string;
  commodity: string;
  market: string;
  price: number;
  date: string;
}