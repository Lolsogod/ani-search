import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MOBILE_BREAKPOINT } from '../constants';
import { PaginationProps } from './props';

export const Pagination = React.memo(({ 
  page, 
  pagination, 
  loading, 
  onPageChange 
}: PaginationProps) => {
  const { width } = useWindowDimensions();
  const isMobile = width < MOBILE_BREAKPOINT;
  const maxVisiblePages = isMobile ? 3 : 5;
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

  const PageButton = ({ pageNum, active = false, label }: { 
    pageNum: number, 
    active?: boolean,
    label?: string 
  }) => (
    <TouchableOpacity
      onPress={() => !loading && onPageChange(pageNum)}
      disabled={active || loading}
      className={`px-2 py-1 mx-0.5 rounded min-w-[32px] items-center justify-center ${
        active 
          ? 'bg-blue-500' 
          : loading 
            ? 'bg-gray-200' 
            : 'bg-white border border-gray-300'
      }`}
    >
      <Text className={`${active ? 'text-white' : 'text-gray-700'} text-sm`}>
        {label || pageNum}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="p-2 border-t border-gray-200">
      <View className="flex-row justify-center items-center flex-wrap">
        {page > 1 && (
          <PageButton pageNum={page - 1} label="←" />
        )}

        {!isMobile && pageNumbers[0] > 1 && (
          <>
            <PageButton pageNum={1} />
            {pageNumbers[0] > 2 && (
              <Text className="mx-1">...</Text>
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

        {!isMobile && pageNumbers[pageNumbers.length - 1] < lastPage && (
          <>
            {pageNumbers[pageNumbers.length - 1] < lastPage - 1 && (
              <Text className="mx-1">...</Text>
            )}
            <PageButton pageNum={lastPage} />
          </>
        )}

        {page < lastPage && (
          <PageButton pageNum={page + 1} label="→" />
        )}
      </View>

      <Text className="text-center mt-2 text-sm text-gray-600">
        Всего: {pagination.items.total}
      </Text>
    </View>
  );
});

Pagination.displayName = 'Pagination';