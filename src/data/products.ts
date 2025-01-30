export const products = {
  crops: [
    {
      id: 'wheat-001',
      name: 'Premium Organic Wheat',
      category: 'Grains',
      price: 2400,
      quantity: 100,
      unit: 'quintal',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
      seller: 'ABC FPO',
      specifications: [
        { name: 'Type', value: 'Hard Red Winter Wheat' },
        { name: 'Protein Content', value: '12-14%' },
        { name: 'Moisture', value: '<12%' },
        { name: 'Grade', value: 'Premium' }
      ],
      certifications: [
        { name: 'Organic', issuedBy: 'USDA', validUntil: '2024-12-31' },
        { name: 'Non-GMO', issuedBy: 'NON-GMO Project', validUntil: '2024-12-31' }
      ]
    },
    // Add more crops...
  ],
  fertilizers: [
    {
      id: 'fert-001',
      name: 'Premium NPK 14-35-14',
      category: 'Fertilizers',
      price: 1200,
      quantity: 50,
      unit: 'bag',
      image: 'https://images.unsplash.com/photo-1533484211272-98ffb5a6f0e4?w=400&h=300&fit=crop',
      seller: 'XYZ Agro',
      specifications: [
        { name: 'N-P-K Ratio', value: '14-35-14' },
        { name: 'Form', value: 'Granular' },
        { name: 'Weight', value: '50 kg' }
      ],
      certifications: [
        { name: 'Quality Certified', issuedBy: 'Fertilizer Control Board', validUntil: '2024-12-31' }
      ]
    },
    // Add more fertilizers...
  ],
  seeds: [
    {
      id: 'seed-001',
      name: 'High-Yield Hybrid Tomato Seeds',
      category: 'Seeds',
      price: 850,
      quantity: 100,
      unit: 'packet',
      image: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400&h=300&fit=crop',
      seller: 'PQR Seeds',
      specifications: [
        { name: 'Variety', value: 'Hybrid F1' },
        { name: 'Germination Rate', value: '>90%' },
        { name: 'Seeds per Packet', value: '100' }
      ],
      certifications: [
        { name: 'Seed Quality', issuedBy: 'Seed Certification Agency', validUntil: '2024-12-31' }
      ]
    },
    // Add more seeds...
  ]
};

export const marketPrices = [
  {
    id: 'mp-001',
    productId: 'wheat-001',
    productName: 'Premium Organic Wheat',
    category: 'Grains',
    price: 2400,
    unit: 'quintal',
    market: 'Central Market',
    timestamp: new Date().toISOString(),
    trend: 'up' as const,
    percentageChange: 2.5
  },
  // Add more market prices...
];

export const weatherData: WeatherData = {
  current: {
    temp: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    feelsLike: 30,
    pressure: 1012,
    visibility: 10,
    uvIndex: 6
  },
  forecast: [
    {
      date: '2024-03-20',
      high: 29,
      low: 22,
      condition: 'Partly Cloudy',
      precipitation: 20,
      humidity: 65
    },
    // Add more forecast days...
  ],
  alerts: [
    {
      type: 'Rain',
      description: 'Heavy rainfall expected in the evening',
      severity: 'medium',
      validUntil: '2024-03-20T23:59:59Z'
    }
  ],
  lastUpdated: new Date().toISOString()
};