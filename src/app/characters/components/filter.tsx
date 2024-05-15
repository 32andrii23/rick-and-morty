'use client';

import { FilterIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FILTER_OPTIONS } from '@/consts';
import { createQueryString } from '@/lib/utils';

export default function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="static h-fit w-full rounded-lg border p-4 shadow-sm sm:sticky sm:top-[100px] sm:w-[350px]">
      <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
        Filter
        <FilterIcon className="h-4 w-4" />
      </h3>
      <Accordion type="multiple">
        {FILTER_OPTIONS.map((filter) => (
          <AccordionItem key={filter.value} value={filter.value}>
            <AccordionTrigger>{filter.name}</AccordionTrigger>
            <AccordionContent>
              <ul>
                {[...filter.options].map((option) => (
                  <li
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      id={filter.value + option.value}
                      name={filter.value}
                      checked={option.value === searchParams.get(filter.value)}
                      onChange={() =>
                        router.push(
                          pathname +
                            '?' +
                            createQueryString(
                              filter.value,
                              option.value,
                              searchParams,
                            ),
                        )
                      }
                      className="my-1 ml-1 h-4 w-4 checked:bg-black checked:hover:bg-black focus:ring-black checked:focus:bg-black checked:focus:ring-black active:focus:ring-black"
                    />
                    <label
                      className="font-medium"
                      htmlFor={filter.value + option.value}
                    >
                      {option.name}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
