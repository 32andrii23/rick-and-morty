'use client';

import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SORT_OPTIONS } from '@/consts';
import { createQueryString } from '@/lib/utils';

export default function Sort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="shadow-button flex items-center">
        Sort by
        <ChevronDown className="ml-1 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() =>
              router.push(
                pathname +
                  '?' +
                  createQueryString('sort', option.value, searchParams),
              )
            }
            className={
              searchParams.get('sort') === option.value ? 'underline' : ''
            }
          >
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
