import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';
import { RickAndMortyCharacter } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return moment(date).format('MM-DD-YYYY');
}

export const createQueryString = (
  name: string,
  value: string,
  searchParams: URLSearchParams,
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};

export const sortCharacters = (
  characters: RickAndMortyCharacter[],
  sortBy: string,
) =>
  characters.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'added') {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    } else if (sortBy === 'episodes') {
      return b.episode.length - a.episode.length;
    } else {
      return 0;
    }
  });
