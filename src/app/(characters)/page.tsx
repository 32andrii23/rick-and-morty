import { Suspense } from 'react';
import axios from 'axios';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import Filter from './components/filter';
import List from './components/list';
import Pagination from './components/pagination';
import Header from './components/header';
import ScrollToTop from './components/scroll-top';

export default async function CharactersPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['characters'],
    queryFn: async () => {
      const response = await axios.get(
        'https://rickandmortyapi.com/api/character',
      );
      return response.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <ScrollToTop />
        <main className="container mt-6">
          <Header />
          <div className="mb-6 mt-[115px] flex flex-col gap-4 sm:flex-row">
            <Filter />
            <List />
          </div>
          <Pagination />
        </main>
      </Suspense>
    </HydrationBoundary>
  );
}
