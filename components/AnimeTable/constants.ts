import { AnimeType } from "@/types/anime";

export const MOBILE_BREAKPOINT = 640;
export const COLUMN_SETS = {
  TYPE_SCORE: 'type-score',
  MEMBERS_EPISODES: 'members-episodes'
  } as const;
export const ANIME_TYPES: AnimeType[] = ['TV', 'Movie', 'OVA', 'Special', 'ONA', 'Music'];
  