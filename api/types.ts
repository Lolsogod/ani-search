import type { 
  AnimeDataFull,
  Pagination,
  OrderBy,
  SortDirection,
  AnimeType 
} from '@/types/anime';

export interface AnimeResponse {
  data: AnimeDataFull[];
  pagination: Pagination;
}

export interface SearchParams {
  query: string;
  page: number;
  orderBy: OrderBy;
  sort: SortDirection;
  type?: AnimeType;
  minScore?: number;
  maxScore?: number;
  start_date?: string;
  end_date?: string;
}
