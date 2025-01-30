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

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    feelsLike: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
    humidity: number;
  }>;
  alerts?: Array<{
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    validUntil: string;
  }>;
  lastUpdated: string;
}

export interface ProductDetails extends Product {
  specifications: Array<{
    name: string;
    value: string;
  }>;
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    minerals: Array<{
      name: string;
      value: string;
    }>;
  };
  certifications: Array<{
    name: string;
    issuedBy: string;
    validUntil: string;
  }>;
  storage: {
    temperature: string;
    humidity: string;
    shelfLife: string;
    specialInstructions?: string;
  };
  origin: {
    region: string;
    farmer: string;
    farmingMethod: string;
    harvestDate: string;
  };
  reviews: Array<{
    userId: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  averageRating: number;
  totalReviews: number;
}

export interface MarketPrice {
  id: string;
  productId: string;
  productName: string;
  category: string;
  price: number;
  unit: string;
  market: string;
  timestamp: string;
  trend: 'up' | 'down' | 'stable';
  percentageChange: number;
}

export interface AdminUser extends User {
  role: 'admin';
  permissions: Array<{
    resource: string;
    actions: string[];
  }>;
  lastLogin: string;
  activityLog: Array<{
    action: string;
    timestamp: string;
    details: string;
  }>;
}