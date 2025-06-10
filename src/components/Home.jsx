import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Feed from './Feed'
import Sidebar from './SideBar'
import MarketplaceFeatures from './MarketplaceFeatures'
import { FaFire, FaClock, FaStar, FaHeart, FaFilter, FaArrowRight, FaGem, FaChartLine, FaStore } from 'react-icons/fa'

export const Home = ({products}) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Update filtered products when products or filters change
  useEffect(() => {
    let filtered = [...products];

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

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedPriceRange]);

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

  // Get trending products (most recent or based on some criteria)
  const trendingProducts = products.slice(0, 3);
  const recentProducts = products.slice(-4);
  const freeProducts = products.filter(p => 
    p.price.toLowerCase().includes('free') || 
    parseFloat(p.price.replace(/[^0-9.]/g, '')) === 0
  );

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
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase">
                  Welcome to Bulls Hub
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                Your Ultimate
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Student Experience
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Everything you need as a USF student - marketplace, study groups, events, and so much more
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Link to="/products" className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                  <FaStore />
                  <span>Explore Products</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <button 
                  onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl font-semibold border border-white/20 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span>Browse Features</span>
                </button>
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

          {/* Modern Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:bg-white/80 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FaStar className="text-white text-2xl" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Items</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{products.length}</p>
                  </div>
                </div>
                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </div>

            <div className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:bg-white/80 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FaHeart className="text-white text-2xl" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Free Items</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{freeProducts.length}</p>
                  </div>
                </div>
                <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              </div>
            </div>

            <div className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:bg-white/80 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FaGem className="text-white text-2xl" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Categories</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">9</p>
                  </div>
                </div>
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>
            </div>

            <div className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:bg-white/80 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-3xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FaFire className="text-white text-2xl" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active Users</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">247</p>
                  </div>
                </div>
                <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Trending Section */}
        {trendingProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Trending Now</h2>
                <p className="text-gray-600">Most popular items this week</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trendingProducts.map(product => (
                <div key={product.id} className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 transform hover:-translate-y-3 hover:rotate-1">
                  <div className="relative overflow-hidden rounded-t-3xl">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg animate-pulse">
                        <FaFire className="text-sm" />
                        Hot
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-xl text-xs font-semibold">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{product.title}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{product.price}</p>
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-semibold shadow-lg">
                        View Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recently Added */}
        {recentProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                <FaClock className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Recently Added</h2>
                <p className="text-gray-600">Fresh listings from fellow students</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentProducts.map(product => (
                <div key={product.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 text-sm truncate mb-2">{product.title}</h4>
                    <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* College Features Section */}
        <div id="features-section">
          <MarketplaceFeatures />
        </div>

        {/* Main Product Feed */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
              </h2>
              <p className="text-gray-600 mt-2">Discover amazing deals from your fellow Bulls</p>
            </div>
            <div className="text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
              Showing {filteredProducts.length} of {products.length} items
            </div>
          </div>

          {filteredProducts.length ? (
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20">
              <Feed 
                products={filteredProducts} 
                favoriteProducts={favoriteProducts}
                onToggleFavorite={toggleFavorite}
              />
              <div className="mt-8 text-center">
                <Link 
                  to="/products" 
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <FaStore />
                  <span>View All Products</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-xl p-16 rounded-3xl shadow-xl border border-white/20 text-center">
              <div className="text-gray-400 text-8xl mb-6">📦</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No products found</h3>
              <p className="text-gray-500 mb-8 text-lg">
                Try adjusting your filters or search for something else
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedPriceRange('all');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

Home.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string
  })).isRequired
}
