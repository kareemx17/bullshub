import {Link} from "react-router-dom"
import { FaHeart, FaRegHeart, FaEye, FaMapMarkerAlt, FaTag, FaClock } from 'react-icons/fa'

const Product = ({product, isFavorite, onToggleFavorite}) => {
  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) {
      // If it's already a full URL, return it as is
      return imagePath;
    } else {
      // If it's just a filename, prepend the uploads path
      return `http://localhost:8000/uploads/${imagePath}`;
    }
  };

  // Determine if the product is free
  const isFree = product.price.toLowerCase().includes('free') || 
                 parseFloat(product.price.replace(/[^0-9.]/g, '')) === 0;

  // Get condition badge (simulate based on product data)
  const getConditionBadge = () => {
    const title = product.title.toLowerCase();
    if (title.includes('new') || title.includes('unused')) return { text: 'New', color: 'bg-green-500' };
    if (title.includes('like new') || title.includes('barely used')) return { text: 'Like New', color: 'bg-blue-500' };
    if (title.includes('used') || title.includes('good condition')) return { text: 'Used', color: 'bg-yellow-500' };
    return { text: 'Good', color: 'bg-gray-500' };
  };

  const condition = getConditionBadge();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
          src={getImageUrl(product.image)} 
          alt={product.title}
          onError={(e) => {
            // Prevent infinite loop by checking if it's already the fallback
            if (!e.target.src.includes('data:image')) {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=';
            }
          }}
        />
        
        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
            <Link 
              to={`/product/${product.id}`}
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <FaEye className="text-sm" />
            </Link>
            <button
              onClick={() => onToggleFavorite?.(product.id)}
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              {isFavorite ? <FaHeart className="text-red-500 text-sm" /> : <FaRegHeart className="text-sm" />}
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isFree && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
              FREE
            </span>
          )}
          <span className={`${condition.color} text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg`}>
            {condition.text}
          </span>
        </div>

        {/* Favorite Button - Always Visible on Mobile */}
        <button
          onClick={() => onToggleFavorite?.(product.id)}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 shadow-lg lg:opacity-0 group-hover:opacity-100"
        >
          {isFavorite ? <FaHeart className="text-red-500 text-sm" /> : <FaRegHeart className="text-gray-600 text-sm" />}
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="flex items-center gap-2">
          <FaTag className="text-gray-400 text-xs" />
          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
          {product.title}
        </h3>

        {/* Description Preview */}
        <p className="text-gray-600 text-sm line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Price and Contact */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className={`font-bold text-xl ${isFree ? 'text-green-600' : 'text-gray-900'}`}>
              {product.price}
            </p>
            {product.contact && (
              <div className="flex items-center gap-1 mt-1">
                <FaMapMarkerAlt className="text-gray-400 text-xs" />
                <span className="text-xs text-gray-500">
                  {product.contact.includes('usf.edu') ? 'USF Student' : 'Local Seller'}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-gray-400">
            <FaClock className="text-xs" />
            <span className="text-xs">2d ago</span>
          </div>
        </div>

        {/* Action Button */}
        <Link 
          to={`/product/${product.id}`} 
          className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-3 rounded-lg 
                   hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium
                   transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default Product
