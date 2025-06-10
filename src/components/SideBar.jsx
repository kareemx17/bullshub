import { FaEnvelope, FaBook, FaLaptop, FaFlask, FaHome, FaTshirt, FaGamepad, FaFilter, FaDollarSign, FaStar, FaChartLine, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({ onCategoryFilter, onPriceFilter, selectedCategory, selectedPriceRange }) => {

  const categories = [
    { id: 'all', name: 'All Items', icon: FaHome, count: 'All' },
    { id: 'books', name: 'Books', icon: FaBook, count: '5' },
    { id: 'electronics', name: 'Electronics', icon: FaLaptop, count: '3' },
    { id: 'lab equipment', name: 'Lab Equipment', icon: FaFlask, count: '2' },
    { id: 'project kit', name: 'Project Kits', icon: FaGamepad, count: '1' },
    { id: 'furniture', name: 'Furniture', icon: FaHome, count: '1' },
    { id: 'supplies', name: 'Supplies', icon: FaTshirt, count: '1' },
    { id: 'study materials', name: 'Study Materials', icon: FaBook, count: '1' },
    { id: 'appliances', name: 'Appliances', icon: FaLaptop, count: '1' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices', range: null },
    { id: 'free', name: 'Free', range: [0, 0] },
    { id: 'under-20', name: 'Under $20', range: [0, 20] },
    { id: '20-50', name: '$20 - $50', range: [20, 50] },
    { id: 'over-50', name: 'Over $50', range: [50, 1000] }
  ];

  return (
    <div className="min-h-screen w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col shadow-2xl border-r border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <FaChartLine className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Bull&apos;s Market</h2>
            <p className="text-xs text-gray-400">College Marketplace</p>
          </div>
        </div>
        
        {/* Messaging Button */}
        <Link
          to="/messages"
          className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 
                   text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 
                   transform hover:-translate-y-0.5 hover:shadow-lg group"
        >
          <FaEnvelope className="mr-2 group-hover:animate-bounce" /> 
          <span className="font-medium">Messages</span>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <FaStar className="text-yellow-400" />
          Quick Stats
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-green-400">12</div>
            <div className="text-xs text-gray-400">Active Items</div>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">4</div>
            <div className="text-xs text-gray-400">Free Items</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <FaFilter className="text-green-400" />
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <li key={category.id}>
                  <button
                    onClick={() => onCategoryFilter(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 
                              ${isSelected 
                                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105' 
                                : 'hover:bg-gray-700/50 text-gray-300 hover:text-white hover:translate-x-1'
                              }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`${isSelected ? 'text-white' : 'text-gray-400'}`} />
                      <span className="font-medium text-sm">{category.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isSelected ? 'bg-white/20' : 'bg-gray-700 text-gray-300'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Price Filter */}
        <div className="p-6 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <FaDollarSign className="text-yellow-400" />
            Price Range
          </h3>
          <ul className="space-y-2">
            {priceRanges.map((priceRange) => {
              const isSelected = selectedPriceRange === priceRange.id;
              return (
                <li key={priceRange.id}>
                  <button
                    onClick={() => onPriceFilter(priceRange.id, priceRange.range)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 
                              ${isSelected 
                                ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg' 
                                : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                              }`}
                  >
                    <span className="font-medium text-sm">{priceRange.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="p-6 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <FaClock className="text-purple-400" />
            Recent Activity
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>New textbook added</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Calculator sold</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>New message received</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
