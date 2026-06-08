export default function SkeletonLoader() {
    return (
      <div className="animate-pulse space-y-6">
        <div className="flex items-center gap-4 p-6 rounded-xl bg-gray-100">
          <div className="w-20 h-20 rounded-full bg-gray-300" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-1/3" />
            <div className="h-3 bg-gray-300 rounded w-1/2" />
            <div className="h-3 bg-gray-300 rounded w-1/4" />
          </div>
        </div>
  
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-xl bg-gray-100 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-1/4" />
            <div className="h-3 bg-gray-300 rounded w-3/4" />
            <div className="flex gap-4">
              <div className="h-3 bg-gray-300 rounded w-16" />
              <div className="h-3 bg-gray-300 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }