const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Enhanced Spinner */}
      <div className={`${sizes[size]} relative`}>
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full opacity-25"></div>
        
        {/* Main spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin">
          <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent"></div>
        </div>
        
        {/* Secondary spinning ring (opposite direction) */}
        <div className="absolute inset-1 border-2 border-transparent rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}>
          <div className="absolute inset-0 border-2 border-blue-500 rounded-full border-r-transparent border-b-transparent"></div>
        </div>
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {message && (
        <div className="mt-6 text-center">
          <p className="text-gray-700 text-lg font-medium mb-2">
            {message}
          </p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner; 