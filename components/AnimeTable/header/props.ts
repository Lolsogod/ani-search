import type { VisibleColumns } from '../types';
import type { OrderBy, SortDirection } from '@/types/anime';

export interface TableHeaderProps {
    orderBy: OrderBy;
    sortDirection: SortDirection;
    onSort: (field: OrderBy) => void;
    visibleColumns: VisibleColumns;
    onColumnsToggle: () => void;
  }