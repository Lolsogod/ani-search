import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { DatePickers } from './DatePickers';
import type { TableFilters } from './types';
import type { AnimeType } from '@/types/anime';

interface FilterSectionProps {
  filters: TableFilters;
  onFiltersChange: (filters: Partial<TableFilters>) => void;
}

const ANIME_TYPES: AnimeType[] = ['TV', 'Movie', 'OVA', 'Special', 'ONA', 'Music'];

export const FilterSection = ({ filters, onFiltersChange }: FilterSectionProps) => {
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
            onPress={() => onFiltersChange({ 
              selectedType: filters.selectedType === type ? undefined : type 
            })}
            className={`px-3 py-1 rounded-full ${
              filters.selectedType === type ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            <Text className={
              filters.selectedType === type ? 'text-white' : 'text-gray-700'
            }>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};