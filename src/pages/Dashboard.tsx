import React, { useState } from 'react';
import { BarChart3, Users, ShoppingBag, TrendingUp, Newspaper, Cloud, Sun, CloudRain, Wind, Filter, Search, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  stats: [
    { name: 'Total Members', value: '250', icon: Users, change: '+12%', changeType: 'increase' },
    { name: 'Active Listings', value: '45', icon: ShoppingBag, change: '+18%', changeType: 'increase' },
    { name: 'Monthly Revenue', value: '₹2.4L', icon: TrendingUp, change: '+8%', changeType: 'increase' },
    { name: 'Market Reach', value: '12', icon: BarChart3, change: '+5%', changeType: 'increase' },
  ],
  chartData: [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 },
  ],
  featuredProducts: {
    crops: [
      { name: 'Organic Wheat', price: 2400, unit: 'quintal', stock: 150, trend: 'up', change: '+5%' },
      { name: 'Basmati Rice', price: 3500, unit: 'quintal', stock: 100, trend: 'down', change: '-2%' },
      { name: 'Yellow Soybean', price: 4200, unit: 'quintal', stock: 80, trend: 'up', change: '+8%' },
    ],
    seeds: [
      { name: 'Hybrid Tomato Seeds', price: 850, unit: 'kg', stock: 50, trend: 'up', change: '+3%' },
      { name: 'BT Cotton Seeds', price: 1200, unit: 'kg', stock: 30, trend: 'stable', change: '0%' },
      { name: 'High-Yield Wheat Seeds', price: 750, unit: 'kg', stock: 45, trend: 'up', change: '+4%' },
    ],
    fertilizers: [
      { name: 'NPK 14-35-14', price: 1600, unit: 'bag', stock: 200, trend: 'down', change: '-1%' },
      { name: 'Urea', price: 900, unit: 'bag', stock: 350, trend: 'up', change: '+6%' },
      { name: 'Organic Compost', price: 400, unit: 'bag', stock: 500, trend: 'stable', change: '0%' },
    ]
  },
  news: [
    {
      id: 1,
      title: 'Government Announces New MSP for Rabi Crops',
      date: '2024-03-15',
      summary: 'The government has increased the minimum support price for wheat and other rabi crops.',
      source: 'Agriculture Ministry',
      category: 'policy'
    },
    {
      id: 2,
      title: 'Weather Alert: Early Monsoon Predicted',
      date: '2024-03-14',
      summary: 'Meteorological Department forecasts early arrival of monsoon this year.',
      source: 'IMD',
      category: 'weather'
    },
    {
      id: 3,
      title: 'New Organic Farming Scheme Launched',
      date: '2024-03-13',
      summary: 'State government launches new scheme to promote organic farming practices.',
      source: 'State Agriculture Department',
      category: 'scheme'
    }
  ],
  weather: {
    current: {
      temp: 28,
      humidity: 65,
      windSpeed: 12,
      condition: 'Partly Cloudy'
    },
    forecast: [
      { day: 'Today', high: 29, low: 22, condition: 'Partly Cloudy' },
      { day: 'Tomorrow', high: 30, low: 23, condition: 'Sunny' },
      { day: 'Wed', high: 27, low: 21, condition: 'Rain' },
      { day: 'Thu', high: 28, low: 22, condition: 'Cloudy' },
      { day: 'Fri', high: 29, low: 23, condition: 'Windy' }
    ]
  }
};

const Dashboard: React.FC = () => {
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('crops');

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'partly cloudy': return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'cloudy': return <Cloud className="h-6 w-6 text-gray-600" />;
      case 'rain': return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'windy': return <Wind className="h-6 w-6 text-gray-500" />;
      default: return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  const filteredNews = mockData.news.filter(item => {
    const matchesCategory = selectedNewsCategory === 'all' || item.category === selectedNewsCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getProductTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {mockData.stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <dt>
                <div className="absolute bg-green-500 rounded-md p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {item.change}
                </p>
              </dd>
            </div>
          );
        })}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Weather Forecast</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              {getWeatherIcon(mockData.weather.current.condition)}
            </div>
            <div>
              <p className="text-3xl font-semibold">{mockData.weather.current.temp}°C</p>
              <p className="text-gray-500">{mockData.weather.current.condition}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>Humidity: {mockData.weather.current.humidity}%</p>
                <p>Wind: {mockData.weather.current.windSpeed} km/h</p>
              </div>
            </div>
          </div>
          
          
          <div className="grid grid-cols-5 gap-2">
            {mockData.weather.forecast.map((day) => (
              <div key={day.day} className="text-center">
                <p className="text-sm font-medium text-gray-500">{day.day}</p>
                {getWeatherIcon(day.condition)}
                <p className="mt-1 text-sm font-medium">{day.high}°</p>
                <p className="text-sm text-gray-500">{day.low}°</p>
              </div>
            ))}
          </div>
        </div>
      </div>

     
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Market Prices</h3>
          <div className="flex space-x-2">
            {['crops', 'seeds', 'fertilizers'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedProductCategory(category)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedProductCategory === category
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {mockData.featuredProducts[selectedProductCategory as keyof typeof mockData.featuredProducts].map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock} {product.unit}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">₹{product.price}/{product.unit}</p>
                <p className={`text-sm ${getProductTrendColor(product.trend)}`}>
                  {product.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <h3 className="text-lg font-medium text-gray-900 mr-4">Latest News</h3>
            <div className="flex space-x-2">
              {['all', 'policy', 'weather', 'scheme'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedNewsCategory(category)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    selectedNewsCategory === category
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="space-y-4">
          {filteredNews.map((item) => (
            <div key={item.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-medium text-gray-900 hover:text-green-600 cursor-pointer flex items-center">
                    {item.title}
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">{item.summary}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <span className="px-2 py-1 rounded-full bg-gray-100">{item.source}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span className="capitalize">{item.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Revenue Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#22C55E" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;