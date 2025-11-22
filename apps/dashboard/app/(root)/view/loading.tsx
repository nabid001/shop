import { Skeleton } from "@/components/ui/skeleton";

const OrderViewSkeleton = () => {
  return (
    <div className="sm:max-w-5xl w-full mx-auto mt-5 py-16 px-4 sm:px-6 lg:px-8 animate-pulse space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-9 w-24" />
      </div>

      {/* User Info */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-28" />
        <div className="p-5 border rounded-md shadow-sm">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-28" />

        <div className="p-5 border rounded-md shadow-sm space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex gap-3 items-center relative">
                <Skeleton className="h-20 w-20 rounded-sm" />
                <Skeleton className="absolute -top-2 left-20 h-5 w-5 rounded-full" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              <div className="text-end space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}

          <Skeleton className="h-[1px] w-full" />

          {/* Price Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <Skeleton className="h-[1px] w-full" />

          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>

      {/* Payment & Delivery */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-56" />
        <div className="p-5 border rounded-md shadow-sm space-y-6">
          {[1, 2, 3].map((row) => (
            <div key={row} className="flex flex-col sm:flex-row sm:gap-7 gap-4">
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderViewSkeleton;
