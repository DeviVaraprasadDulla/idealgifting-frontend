function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white p-3 sm:p-4 rounded-2xl shadow-sm"
        >
          <div className="h-48 sm:h-56 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
