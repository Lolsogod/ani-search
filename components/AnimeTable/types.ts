export type AnimeType = 'TV' | 'Movie' | 'OVA' | 'Special' | 'ONA' | 'Music';
export type OrderBy = 'title' | 'score' | 'members' | 'episodes';
export type SortDirection = 'asc' | 'desc';

export interface AnimeData {
  mal_id: number;
  title: string;
  type: AnimeType;
  score: number | null;
  members: number | null;
  episodes: number | null;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface TableFilters {
  searchQuery: string;
  selectedType?: AnimeType;
  minScore: string;
  maxScore: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface TableSorting {
  orderBy: OrderBy;
  direction: SortDirection;
}

export type VisibleColumns = 'type-score' | 'members-episodes';


export interface TableState {
  data: AnimeData[];
  page: number;
  loading: boolean;
  filters: TableFilters;
  sorting: TableSorting;
  pagination: Pagination;
  visibleColumns: VisibleColumns;
  updateFilters: (filters: Partial<TableFilters>) => void;
  updateSorting: (field: OrderBy) => void;
  updatePage: (page: number) => void;
  toggleColumns: () => void;
}