import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
    page: number;
    maxPages: number;
    onPageChange?: (page: number) => void;
    disabled?: boolean;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({ page, maxPages, onPageChange, disabled }) => {
    // Helper function to create an array of page numbers and ellipsis
    const getPageNumbers = (): (number | 'ellipsis')[] => {
        const pages: (number | 'ellipsis')[] = [];

        if (maxPages <= 7) {
            // If maxPages is 7 or less, show all pages
            for (let i = 1; i <= maxPages; i++) {
                pages.push(i);
            }
        } else {
            if (page <= 4) {
                // Current page is near the start
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(maxPages);
            } else if (page >= maxPages - 3) {
                // Current page is near the end
                pages.push(1);
                pages.push('ellipsis');
                for (let i = maxPages - 4; i <= maxPages; i++) {
                    pages.push(i);
                }
            } else {
                // Current page is somewhere in the middle
                pages.push(1);
                pages.push('ellipsis');
                pages.push(page - 1);
                pages.push(page);
                pages.push(page + 1);
                pages.push('ellipsis');
                pages.push(maxPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    const previousDisabled = (disabled || page === 1);
    const nextDisabled = (disabled || page === maxPages);
    const handlePageClick = (pageNumber: number) => {
        if (disabled) return;

        if (pageNumber !== page && pageNumber >= 1 && pageNumber <= maxPages && onPageChange) {
            onPageChange(pageNumber);
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        textDisabled
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) handlePageClick(page - 1);
                        }}

                        aria-disabled={previousDisabled}
                        tabIndex={previousDisabled ? -1 : undefined}
                        className={`${previousDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {pageNumbers.map((pageNumber, index) => {
                    if (pageNumber === 'ellipsis') {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink
                                href="#"
                                isActive={pageNumber === page}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageClick(pageNumber as number);
                                }}

                                aria-disabled={disabled}
                                tabIndex={disabled ? -1 : undefined}
                                className={`${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        textDisabled
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (page < maxPages) handlePageClick(page + 1);
                        }}
                        aria-disabled={nextDisabled}
                        tabIndex={nextDisabled ? -1 : undefined}
                        className={`${nextDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};