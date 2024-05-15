'use client';

import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import usePagesStore from '@/hooks/pagesStore';
import { createQueryString } from '@/lib/utils';

export default function Pagination() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { numberOfPages } = usePagesStore();

  const currentPage = Number(searchParams.get('page')) || 1;

  const isFirstPage = currentPage === 1 || !currentPage;
  const isLastPage = currentPage === numberOfPages;

  const isLeftGap = currentPage > 3;
  const isRightGap = numberOfPages - currentPage > 2;

  const handlePage = (page: number) => {
    router.push(
      pathname + '?' + createQueryString('page', String(page), searchParams),
    );
    // console.log(numberOfPages);
  };

  return (
    <div className="mb-20 flex items-center justify-center gap-4">
      <button
        onClick={() => handlePage(currentPage - 1)}
        disabled={isFirstPage}
        className="shadow-button flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      {isLeftGap && (
        <>
          <button
            className="shadow-button flex items-center gap-1"
            onClick={() => handlePage(1)}
          >
            1
          </button>
          <Ellipsis className="mt-3 h-4 w-4" />
        </>
      )}

      {!isFirstPage && (
        <button
          className="shadow-button flex items-center gap-1"
          onClick={() => handlePage(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      )}

      <div className="flex items-center gap-1 underline">{currentPage}</div>

      {!isLastPage && (
        <button
          className="shadow-button flex items-center gap-1"
          onClick={() => handlePage(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      )}

      {isRightGap && (
        <>
          <Ellipsis className="mt-3 h-4 w-4" />
          <button
            className="shadow-button flex items-center gap-1"
            onClick={() => handlePage(numberOfPages)}
          >
            {numberOfPages}
          </button>
        </>
      )}

      <button
        onClick={() => handlePage(currentPage + 1)}
        disabled={isLastPage}
        className="shadow-button flex items-center gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
