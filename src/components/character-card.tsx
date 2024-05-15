import React from 'react';
import { Info, X } from 'lucide-react';
import Image from 'next/image';

import { RickAndMortyCharacter } from '@/types';
import { cn, formatDate } from '@/lib/utils';
import { CHARACTER_SPECIES_ICON } from '@/consts';

interface CardProps {
  character: RickAndMortyCharacter;
}

export default function Card({ character }: CardProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const IconComponent =
    CHARACTER_SPECIES_ICON[character.species] ||
    CHARACTER_SPECIES_ICON['Other'];

  const characterDetails = [
    {
      label: 'Name',
      value: character.name,
    },
    {
      label: 'Status',
      value: character.status,
    },
    {
      label: 'Species',
      value: character.species,
    },
    {
      label: 'Gender',
      value: character.gender,
    },
    {
      label: 'Origin',
      value: character.origin.name,
    },
    {
      label: 'Location',
      value: character.location.name,
    },
    {
      label: 'Created',
      value: formatDate(character.created),
    },
    {
      label: 'Episodes',
      value: character.episode.length,
    },
  ];

  return (
    <>
      <div className="group w-full space-y-2 rounded-lg border p-4 shadow-sm">
        <div className="relative aspect-square w-full">
          <Image
            src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`}
            alt={`${character.name} avatar`}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
          <div
            onClick={handleOpenModal}
            className="absolute bottom-2 left-1/2 translate-x-[-50%] translate-y-3 cursor-pointer rounded-full border border-gray-300 bg-white p-2 opacity-0 shadow-sm transition hover:shadow-none group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Info className="h-4 w-4" />
          </div>
        </div>
        <h3 className="truncate text-xl font-bold">{character.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex w-fit items-center gap-2 rounded-xl bg-gray-100 px-4 py-1">
            <div
              className={cn('h-2 w-2 animate-pulse rounded-full', {
                'bg-red-500': character.status === 'Dead',
                'bg-green-500': character.status === 'Alive',
                'bg-gray-500': character.status === 'unknown',
              })}
            />
            <p className="text-sm">{character.status}</p>
          </div>
          <div className="flex items-center gap-1">
            {IconComponent && (
              <IconComponent style={{ height: 18, width: 18 }} />
            )}
            <p
              className="max-w-[75px] truncate text-sm"
              title={character.species}
            >
              {character.species}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          added: {formatDate(character.created)} <br />
          episodes: {character.episode.length}
        </p>
      </div>
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75',
          isModalOpen
            ? 'visible scale-100 opacity-100'
            : ' invisible scale-50 opacity-0',
        )}
        onClick={handleCloseModal}
      >
        <div
          className={cn(
            'm-4 rounded-lg bg-white p-4 shadow-md',
            isModalOpen ? 'block' : 'hidden',
          )}
        >
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <h3 className="text-2xl font-bold">{character.name}</h3>
            <X className="h-6 w-6 cursor-pointer" onClick={handleCloseModal} />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-9">
            <img
              src={character.image}
              alt={character.name}
              className="aspect-square w-[200px] rounded-full border border-gray-300 shadow-md"
            />
            <div className="grid auto-cols-min grid-cols-2 space-y-1">
              {characterDetails.map(({ label, value }) => (
                <>
                  <p className="text-gray-500" key={label + value}>
                    {label}:
                  </p>
                  <p className="font-bold">{value}</p>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
