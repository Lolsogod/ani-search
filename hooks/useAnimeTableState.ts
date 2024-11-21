import { useState, useEffect } from 'react';
import { searchAnime } from '@/api/search';
import { AnimeData, Pagination, TableFilters, TableSorting, OrderBy } from '../types';

export const useAnimeTableState = () => {
  const [data, setData] = useState<AnimeData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<TableFilters>({
    searchQuery: '',
    selectedType: undefined,
    minScore: '',
    maxScore: '',
    startDate: null,
    endDate: null,
  });

  const [sorting, setSorting] = useState<TableSorting>({
    orderBy: 'score',
    direction: 'desc',
  });

  const [pagination, setPagination] = useState<Pagination>({
    last_visible_page: 1,
    has_next_page: false,
    current_page: 1,
    items: {
      count: 0,
      total: 0,
      per_page: 25
    }
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await searchAnime({
        query: filters.searchQuery,
        page,
        orderBy: sorting.orderBy,
        sort: sorting.direction,
        type: filters.selectedType,
        minScore: filters.minScore ? parseFloat(filters.minScore) : undefined,
        maxScore: filters.maxScore ? parseFloat(filters.maxScore) : undefined,
        start_date: filters.startDate ? filters.startDate.toISOString().split('T')[0] : undefined,
        end_date: filters.endDate ? filters.endDate.toISOString().split('T')[0] : undefined,
      });
      setData(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<TableFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const updateSorting = (field: OrderBy) => {
    setSorting(prev => ({
      orderBy: field,
      direction: prev.orderBy === field && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
    setPage(1);
  };

  const updatePage = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchData();
  }, [page, filters, sorting]);

  return {
    data,
    page,
    loading,
    filters,
    sorting,
    pagination,
    updateFilters,
    updateSorting,
    updatePage,
  };
};