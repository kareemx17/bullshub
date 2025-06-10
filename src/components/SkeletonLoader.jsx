const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-pulse">
    {/* Image skeleton */}
    <div className="w-full h-48 bg-gray-300"></div>
    
    {/* Content skeleton */}
    <div className="p-4 space-y-3">
      {/* Category */}
      <div className="h-3 bg-gray-300 rounded w-20"></div>
      
      {/* Title */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
      
      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
      </div>
      
      {/* Price and details */}
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-gray-300 rounded w-16"></div>
        <div className="h-3 bg-gray-300 rounded w-12"></div>
      </div>
      
      {/* Button */}
      <div className="h-10 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
);

const SkeletonLoader = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonLoader; 