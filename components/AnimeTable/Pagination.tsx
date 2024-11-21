import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Pagination as PaginationType } from './types';

interface PaginationProps {
  page: number;
  pagination: PaginationType;
  loading: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination = React.memo(({ 
  page, 
  pagination, 
  loading, 
  onPageChange 
}: PaginationProps) => {
  const maxVisiblePages = 5;
  const lastPage = pagination.last_visible_page;

  const getPageNumbers = () => {
    const pages: number[] = [];
    let start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let end = Math.min(lastPage, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const PageButton = ({ pageNum, active = false }: { pageNum: number, active?: boolean }) => (
    <TouchableOpacity
      onPress={() => !loading && onPageChange(pageNum)}
      disabled={active || loading}
      className={`px-3 py-2 mx-1 rounded ${
        active 
          ? 'bg-blue-500' 
          : loading 
            ? 'bg-gray-200' 
            : 'bg-white border border-gray-300'
      }`}
    >
      <Text className={active ? 'text-white' : 'text-gray-700'}>
        {pageNum}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="p-4 border-t border-gray-200 flex-row justify-center items-center">
      {page > 1 && (
        <PageButton pageNum={page - 1} />
      )}

      {pageNumbers[0] > 1 && (
        <>
          <PageButton pageNum={1} />
          {pageNumbers[0] > 2 && (
            <Text className="mx-2">...</Text>
          )}
        </>
      )}

      {pageNumbers.map(num => (
        <PageButton
          key={num}
          pageNum={num}
          active={num === page}
        />
      ))}

      {pageNumbers[pageNumbers.length - 1] < lastPage && (
        <>
          {pageNumbers[pageNumbers.length - 1] < lastPage - 1 && (
            <Text className="mx-2">...</Text>
          )}
          <PageButton pageNum={lastPage} />
        </>
      )}

      {page < lastPage && (
        <PageButton pageNum={page + 1} />
      )}

      <Text className="ml-4 text-gray-600">
        Всего: {pagination.items.total}
      </Text>
    </View>
  );
});

Pagination.displayName = 'Pagination';