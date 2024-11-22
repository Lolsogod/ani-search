import type { Pagination as PaginationType } from '@/types/anime';

export interface PaginationProps {
    page: number;
    pagination: PaginationType;
    loading: boolean;
    onPageChange: (page: number) => void;
  }
  