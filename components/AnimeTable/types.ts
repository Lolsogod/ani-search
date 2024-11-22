import type { 
  AnimeType,
  AnimeDataTable,
  Pagination,
  OrderBy,
  SortDirection 
} from '@/types/anime';

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
  data: AnimeDataTable[];
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