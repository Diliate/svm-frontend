"use client";

// import React from "react";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   return (
//     <div className="flex justify-center mt-6">
//       <button
//         className="px-4 py-2 border"
//         disabled={currentPage === 1}
//         onClick={() => onPageChange(currentPage - 1)}
//       >
//         Previous
//       </button>
//       {[...Array(totalPages)].map((_, index) => (
//         <button
//           key={index}
//           className={`px-4 py-2 border ${
//             currentPage === index + 1 ? "bg-black text-white" : ""
//           }`}
//           onClick={() => onPageChange(index + 1)}
//         >
//           {index + 1}
//         </button>
//       ))}
//       <button
//         className="px-4 py-2 border"
//         disabled={currentPage === totalPages}
//         onClick={() => onPageChange(currentPage + 1)}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationComp() {
  return (
    <div className="w-full -ml-6 md:-ml-0">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" className="hover:bg-gray-200" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="hover:bg-gray-200">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="hover:bg-gray-200">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="hover:bg-gray-200">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" className="hover:bg-gray-200" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PaginationComp;
