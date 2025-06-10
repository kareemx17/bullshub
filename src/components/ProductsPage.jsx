import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Feed from './Feed'
import Sidebar from './SideBar'
import { FaSearch, FaFilter, FaSort, FaTh, FaList, FaStore } from 'react-icons/fa'

const ProductsPage = ({products}) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Update filtered products when products or filters change
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price filter
    if (selectedPriceRange !== 'all') {
      const priceRanges = {
        'free': [0, 0],
        'under-20': [0, 20],
        '20-50': [20, 50],
        'over-50': [50, 1000]
      };

      const priceRange = priceRanges[selectedPriceRange];
      if (priceRange) {
        filtered = filtered.filter(product => {
          const price = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
          if (selectedPriceRange === 'free') {
            return price === 0 || product.price.toLowerCase().includes('free');
          }
          return price >= priceRange[0] && price <= priceRange[1];
        });
      }
    }

    // Sort products
    filtered.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;

      switch(sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'recent':
        default:
          return b.id - a.id; // Assuming higher ID means more recent
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedPriceRange, sortBy, searchTerm]);

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handlePriceFilter = (priceId) => {
    setSelectedPriceRange(priceId);
  };

  const toggleFavorite = (productId) => {
    setFavoriteProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSearchTerm('');
    setSortBy('recent');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Sidebar */}
      <Sidebar 
        onCategoryFilter={handleCategoryFilter}
        onPriceFilter={handlePriceFilter}
        selectedCategory={selectedCategory}
        selectedPriceRange={selectedPriceRange}
      />

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                  <FaStore className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                    Explore Products
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Discover amazing deals from your fellow Bulls
                  </p>
                </div>
              </div>
            </div>
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
            >
              <FaFilter className="text-gray-600" />
            </button>
          </div>

          {/* Search and Controls Bar */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/20 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  className="px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                  <option value="category">Category</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-2xl p-1">
                                     <button
                     onClick={() => setViewMode('grid')}
                     className={`p-3 rounded-xl transition-all duration-200 ${
                       viewMode === 'grid' 
                         ? 'bg-white shadow-md text-blue-600' 
                         : 'text-gray-500 hover:text-gray-700'
                     }`}
                   >
                     <FaTh />
                   </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-white shadow-md text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FaList />
                  </button>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearAllFilters}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-4 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory !== 'all' || selectedPriceRange !== 'all' || searchTerm) && (
            <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-semibold text-blue-900">Active Filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm font-medium">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedPriceRange !== 'all' && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm font-medium">
                    Price: {selectedPriceRange}
                  </span>
                )}
                                 {searchTerm && (
                   <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-sm font-medium">
                     Search: &ldquo;{searchTerm}&rdquo;
                   </span>
                 )}
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>
          
          <div className="text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
            <FaSort className="inline mr-2" />
            Sorted by: {sortBy.replace('-', ' ')}
          </div>
        </div>

        {/* Products Feed */}
        {filteredProducts.length > 0 ? (
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20">
                         <Feed 
               products={filteredProducts} 
               favoriteProducts={favoriteProducts}
               onToggleFavorite={toggleFavorite}
             />
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl p-16 rounded-3xl shadow-xl border border-white/20 text-center">
            <div className="text-gray-400 text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No products found</h3>
            <p className="text-gray-500 mb-8 text-lg">
              {searchTerm || selectedCategory !== 'all' || selectedPriceRange !== 'all'
                ? 'Try adjusting your search criteria or filters'
                : 'No products available at the moment'}
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 text-center">
            <div className="text-2xl font-bold text-blue-600">{products.length}</div>
            <div className="text-gray-600">Total Products</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 text-center">
            <div className="text-2xl font-bold text-green-600">{favoriteProducts.length}</div>
            <div className="text-gray-600">Your Favorites</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {[...new Set(products.map(p => p.category))].length}
            </div>
            <div className="text-gray-600">Categories</div>
          </div>
        </div>
      </main>
    </div>
  )
}

ProductsPage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string
  })).isRequired
}

export default ProductsPage 