import { Skeleton } from "@/components/ui/skeleton";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

const columnCount = 6;
const rowCount = 8;

const OrdersSkeleton = () => {
  return (
    <div className="w-full flex justify-center min-h-screen">
      <Table className="">
        {/* Table Header */}
        <TableHeader>
          <TableRow>
            {[...Array(columnCount)].map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-5 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {[...Array(rowCount)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(columnCount)].map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-5 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-end space-x-2 py-4 px-3">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
};

export default OrdersSkeleton;
