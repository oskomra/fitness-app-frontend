import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

type WorkoutPaginationProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageCount: number;
  scrollRef: React.RefObject<HTMLDivElement | null>;
};

export default function WorkoutPagination({
  currentPage,
  setCurrentPage,
  pageCount,
  scrollRef,
}: WorkoutPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => {
              setCurrentPage(Math.max(currentPage - 1, 1));
              scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        {[...Array(pageCount)]
          .map((_, idx) => idx + 1)
          .filter(
            (page) =>
              page >= Math.max(1, currentPage - 1) &&
              page <= Math.min(pageCount, currentPage + 1)
          )
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className="cursor-pointer"
                isActive={currentPage === page}
                onClick={() => {
                  setCurrentPage(page);
                  scrollRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => {
              setCurrentPage(Math.min(currentPage + 1, pageCount));
              scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-disabled={currentPage === pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
