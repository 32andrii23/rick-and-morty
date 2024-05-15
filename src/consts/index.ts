import { UserRound, Rocket, Sparkles, CircleHelp, Bot } from 'lucide-react';

export const SORT_OPTIONS = [
  {
    name: 'Name',
    value: 'name',
  },
  {
    name: 'Added',
    value: 'added',
  },
  {
    name: 'Episodes',
    value: 'episodes',
  },
] as const;

export const STATUS_FILTERS = [
  {
    name: 'Alive',
    value: 'alive',
  },
  {
    name: 'Dead',
    value: 'dead',
  },
  {
    name: 'Unknown',
    value: 'unknown',
  },
] as const;

export const GENDER_FILTERS = [
  {
    name: 'Male',
    value: 'male',
  },
  {
    name: 'Female',
    value: 'female',
  },
  {
    name: 'Genderless',
    value: 'genderless',
  },
  {
    name: 'Unknown',
    value: 'unknown',
  },
] as const;

export const FILTER_OPTIONS = [
  {
    name: 'Status',
    value: 'status',
    options: STATUS_FILTERS,
  },
  {
    name: 'Gender',
    value: 'gender',
    options: GENDER_FILTERS,
  },
] as const;

export const CHARACTER_SPECIES_ICON: Record<
  string,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  Human: UserRound,
  Alien: Rocket,
  'Mythological Creature': Sparkles,
  Robot: Bot,
  Other: CircleHelp,
} as const;
