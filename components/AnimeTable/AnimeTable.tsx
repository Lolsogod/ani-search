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
    visibleColumns,
    updateFilters,
    updateSorting,
    updatePage,
    toggleColumns,
  } = useAnimeTableState();

  const renderTableContent = () => {
    if (loading) {
      return <Text className="text-center p-4">Загрузка...</Text>;
    }

    if (data.length === 0) {
      return <Text className="text-center p-4">Ничего не найдено</Text>;
    }

    return data.map((item, index) => (
      <TableRow 
        key={`${item.mal_id}-${index}`} 
        item={item} 
        index={index}
        visibleColumns={visibleColumns}
      />
    ));
  };

  return (
    <View className="flex-1 flex flex-col">
      <FilterSection
        filters={filters}
        onFiltersChange={updateFilters}
      />

      <View className="flex-1 min-h-0 px-4">
        <TableHeader
          orderBy={sorting.orderBy}
          sortDirection={sorting.direction}
          onSort={updateSorting}
          visibleColumns={visibleColumns}
          onColumnsToggle={toggleColumns}
        />
        <ScrollView>
          {renderTableContent()}
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