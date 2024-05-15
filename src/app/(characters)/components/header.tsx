'use client';

import { RefreshCcw } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import Sort from './sort';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="fixed left-1/2 top-0 z-10  w-full -translate-x-1/2 border-b border-gray-300">
      <div className="container flex items-center justify-between py-3 pb-3 backdrop-blur">
        <div>
          <h1 className="flex gap-2 text-lg font-bold sm:text-xl md:text-3xl">
            <span className="hidden sm:block">Rick and Morty</span> Characters
          </h1>
          <h2 className="hidden text-gray-500 sm:block">
            Explore our wide variety of Rick and Morty characters
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Sort />
          <button
            onClick={() => router.push(pathname)}
            className="group rounded-lg border bg-white p-2 shadow-sm transition hover:opacity-75 hover:shadow-none"
          >
            <RefreshCcw className="group-hover:animate-spin" />
          </button>
        </div>
      </div>
    </div>
  );
}
