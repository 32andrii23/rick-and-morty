import axios, { AxiosResponse } from 'axios';

import { RickAndMortyApiResponse, RickAndMortyCharacter } from '@/types';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export async function fetchAllCharacters(
  searchParams: string,
): Promise<RickAndMortyApiResponse> {
  const allCharacters: RickAndMortyApiResponse = {
    info: { count: 0, pages: 0 },
    results: [],
  };
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const { data }: AxiosResponse<RickAndMortyApiResponse> = await axios.get(
      `${BASE_URL}?${searchParams}&page=${page}`,
    );

    if (page === 1) allCharacters.info = data.info;
    allCharacters.results = allCharacters.results.concat(data.results);

    totalPages = data.info.pages;
    page++;
  }

  return allCharacters;
}

export async function fetchCharactersByPage(
  searchParams: string,
): Promise<RickAndMortyApiResponse> {
  const { data }: AxiosResponse<RickAndMortyApiResponse> = await axios.get(
    `${BASE_URL}?${searchParams}`,
  );

  return data;
}
