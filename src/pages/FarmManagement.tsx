import React from 'react';
import { Tractor, Cloud, Thermometer, Droplets } from 'lucide-react';

const FarmManagement: React.FC = () => {
  const weatherData = {
    temperature: '28°C',
    humidity: '65%',
    rainfall: '2.5mm',
    forecast: 'Partly Cloudy',
  };

  const crops = [
    {
      id: 1,
      name: 'Wheat',
      area: '5 acres',
      stage: 'Growing',
      plantingDate: '2024-01-15',
      expectedHarvest: '2024-04-15',
    },
    {
      id: 2,
      name: 'Rice',
      area: '3 acres',
      stage: 'Harvesting',
      plantingDate: '2023-12-01',
      expectedHarvest: '2024-03-15',
    },
    // Add more crops as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Farm Management</h1>

      {/* Weather Information */}
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Weather Information</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center space-x-4">
            <Thermometer className="h-8 w-8 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="text-lg font-medium text-gray-900">{weatherData.temperature}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Droplets className="h-8 w-8 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="text-lg font-medium text-gray-900">{weatherData.humidity}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Cloud className="h-8 w-8 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Rainfall</p>
              <p className="text-lg font-medium text-gray-900">{weatherData.rainfall}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Cloud className="h-8 w-8 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Forecast</p>
              <p className="text-lg font-medium text-gray-900">{weatherData.forecast}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Crop Management */}
      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-lg font-medium text-gray-900">Crop Management</h2>
            <p className="mt-2 text-sm text-gray-700">
              Overview of all crops currently under cultivation.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
            >
              <Tractor className="h-4 w-4 mr-2" />
              Add New Crop
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Crop Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Area
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Stage
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Planting Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Expected Harvest
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {crops.map((crop) => (
                      <tr key={crop.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {crop.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {crop.area}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {crop.stage}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {crop.plantingDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {crop.expectedHarvest}
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
    </div>
  );
};

export default FarmManagement