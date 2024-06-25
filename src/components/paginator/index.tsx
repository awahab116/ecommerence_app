import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  setPage,
}) => {
  const handlePrevious = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrevious}
            className={`px-3 py-2 border rounded ${
              isPreviousDisabled
                ? "text-gray-400 cursor-not-allowed bg-gray-100 hover:text-gray-400"
                : "text-gray-400 bg-gray-100 hover:text-gray-400"
            }`}
            aria-disabled={isPreviousDisabled}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index + 1}>
            <PaginationLink
              href="#"
              isActive={index + 1 === currentPage}
              onClick={(e) => {
                e.preventDefault();
                setPage(index + 1);
              }}
              className={`px-3 py-2 border rounded ${
                index + 1 === currentPage
                  ? "bg-gray-400 text-white"
                  : "text-gray-400 bg-gray-100 hover:text-gray-400"
              }`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            className={`px-3 py-2 border rounded ${
              isNextDisabled
                ? "text-gray-400 cursor-not-allowed bg-gray-100 hover:text-gray-400"
                : "text-gray-400 bg-gray-100 hover:text-gray-400"
            }`}
            aria-disabled={isNextDisabled}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginator;
