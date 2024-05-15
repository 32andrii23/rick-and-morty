'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import Card from '@/components/character-card';
import {
  fetchAllCharacters,
  fetchCharactersByPage,
} from '@/services/fetchData';
import { FILTER_OPTIONS } from '@/consts';
import { sortCharacters } from '@/lib/utils';
import usePagesStore from '@/hooks/pagesStore';

const ITEMS_PER_PAGE = 20;

export default function List() {
  const searchParams = useSearchParams();
  const { numberOfPages, setNumberOfPages } = usePagesStore();

  const sortBy = searchParams.get('sort');

  const currentPage = searchParams.get('page') || '1';
  const filterBy: string[] = [];
  FILTER_OPTIONS.forEach((filter_option) => {
    const filterValue = searchParams.get(filter_option.value);

    if (filterValue)
      filterBy.push(searchParams.get(filter_option.value) as string);
  });

  const searchParamsExcludingPage = new URLSearchParams(searchParams);
  searchParamsExcludingPage.delete('page');

  const { data, isLoading } = useQuery({
    queryKey: ['characters', sortBy, ...filterBy, currentPage],
    queryFn: () =>
      // since the API doesn't provide sorting params, we need to sort the data ourselves by fetching all of it (only in cases when sorting is used)
      sortBy
        ? fetchAllCharacters(searchParamsExcludingPage.toString())
        : fetchCharactersByPage(searchParams.toString()),
  });

  React.useEffect(() => {
    if (!isLoading && data?.info?.pages !== numberOfPages) {
      setNumberOfPages(data?.info?.pages || 42);
    }
  }, [data, isLoading, numberOfPages]);

  const sortedData =
    sortBy && data ? sortCharacters(data.results, sortBy) : data?.results;

  const startIndex = (Number(currentPage) - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const slicedData =
    sortBy && data ? sortedData?.slice(startIndex, endIndex) : data?.results;

  return (
    <div className="grid place-items-center gap-x-4 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.isArray(slicedData) &&
        slicedData?.map((character) => (
          <Card key={character.id} character={character} />
        ))}
    </div>
  );
}
