import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageItems = () => {
    const maxPagesToShow = 5; // Max number of pages to show before and after the current page
    let pages = [];

    // Display pages before and after the current page
    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= maxPagesToShow ||
        i >= totalPages - maxPagesToShow ||
        (i >= currentPage - Math.floor(maxPagesToShow / 2) &&
          i <= currentPage + Math.floor(maxPagesToShow / 2))
      ) {
        pages.push(i);
      }
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent className='mt-4 flex justify-center items-center gap-2'>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* Páginas anteriores y actuales */}
        {getPageItems().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href='#'
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Puntos suspensivos si hay más de 5 páginas */}
        {totalPages > 10 && currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
