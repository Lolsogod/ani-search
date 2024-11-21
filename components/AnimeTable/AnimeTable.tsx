import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useAnimeTableState } from '../../hooks/useAnimeTableState';
import { FilterSection } from './FilterSection';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { Pagination } from './Pagination';

export default function AnimeTable() {
  const {
    data,
    page,
    loading,
    filters,
    sorting,
    pagination,
    updateFilters,
    updateSorting,
    updatePage,
  } = useAnimeTableState();

  return (
    <View className="flex-1 max-h-[calc(100vh-64px)] flex flex-col">
        <FilterSection
          filters={filters}
          onFiltersChange={updateFilters}
        />
        <View className="flex-1 min-h-0"> 
        <ScrollView>
          <View className="p-4">
            <TableHeader
              orderBy={sorting.orderBy}
              sortDirection={sorting.direction}
              onSort={updateSorting}
            />

            {loading ? (
              <Text className="text-center p-4">Загрузка...</Text>
            ) : data.length === 0 ? (
              <Text className="text-center p-4">Ничего не найдено</Text>
            ) : (
              data.map((item, index) => (
                <TableRow
                  key={`${item.mal_id}-${index}`}
                  item={item}
                  index={index}
                />
              ))
            )}
          </View>
        </ScrollView>
      </View>

      <View className="border-t border-gray-200 bg-white">
        <Pagination
          page={page}
          pagination={pagination}
          loading={loading}
          onPageChange={updatePage}
        />
      </View>
    </View>
  );
}