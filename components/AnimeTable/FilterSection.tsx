import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { DatePickers } from './DatePickers';
import type { TableFilters } from './types';
import type { AnimeType } from '@/types/anime';
import { useCallback, useMemo } from 'react';
import { ANIME_TYPES } from './constants';

interface FilterSectionProps {
  filters: TableFilters;
  onFiltersChange: (filters: Partial<TableFilters>) => void;
}

const styles = {
  typeButton: (isSelected: boolean) => `px-3 py-1 rounded-full ${
    isSelected ? 'bg-blue-500' : 'bg-gray-200'
  }`,
  typeText: (isSelected: boolean) => 
    isSelected ? 'text-white' : 'text-gray-700'
};

export const FilterSection = ({ filters, onFiltersChange }: FilterSectionProps) => {
  const handleTypePress = useCallback((type: AnimeType) => {
    onFiltersChange({ 
      selectedType: filters.selectedType === type ? undefined : type 
    });
  }, [filters.selectedType, onFiltersChange]);

  return (
    <View className="p-4 border-b border-gray-200">
      <TextInput
        className="border p-2 rounded-lg mb-2"
        placeholder="Поиск по названию"
        value={filters.searchQuery}
        onChangeText={(text) => onFiltersChange({ searchQuery: text })}
      />

      <View className="flex-row space-x-2 mb-2 gap-2">
        <TextInput
          className="border p-2 rounded-lg flex-1"
          placeholder="Мин. оценка"
          value={filters.minScore}
          onChangeText={(text) => onFiltersChange({ minScore: text })}
          keyboardType="numeric"
        />
        <TextInput
          className="border p-2 rounded-lg flex-1"
          placeholder="Макс. оценка"
          value={filters.maxScore}
          onChangeText={(text) => onFiltersChange({ maxScore: text })}
          keyboardType="numeric"
        />
      </View>

      <DatePickers
        startDate={filters.startDate}
        endDate={filters.endDate}
        onStartDateChange={(date) => onFiltersChange({ startDate: date })}
        onEndDateChange={(date) => onFiltersChange({ endDate: date })}
      />

      <View className="flex-row flex-wrap gap-2">
        {ANIME_TYPES.map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => handleTypePress(type)}
            className={styles.typeButton(filters.selectedType === type)}
          >
            <Text className={styles.typeText(filters.selectedType === type)}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};