import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { DatePickers } from './DatePickers';
import type { TableFilters } from '../types';
import type { AnimeType } from '@/types/anime';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { ANIME_TYPES } from '../constants';
import debounce from 'lodash/debounce';

interface FilterSectionProps {
  filters: TableFilters;
  onFiltersChange: (filters: Partial<TableFilters>) => void;
}

const styles = {
  typeButton: (isSelected: boolean) => `px-3 py-1 rounded-full ${isSelected ? 'bg-blue-500' : 'bg-gray-200'
    }`,
  typeText: (isSelected: boolean) =>
    isSelected ? 'text-white' : 'text-gray-700'
};

export const FilterSection = ({ filters, onFiltersChange }: FilterSectionProps) => {
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);
  const [localMinScore, setLocalMinScore] = useState(filters.minScore);
  const [localMaxScore, setLocalMaxScore] = useState(filters.maxScore);
  const [localStartDate, setLocalStartDate] = useState(filters.startDate);
  const [localEndDate, setLocalEndDate] = useState(filters.endDate);

  const handleTypePress = useCallback((type: AnimeType) => {
    onFiltersChange({
      selectedType: filters.selectedType === type ? undefined : type
    });
  }, [filters.selectedType, onFiltersChange]);

  const debouncedSearchChange = useMemo(
    () => debounce((text: string) => {
      onFiltersChange({ searchQuery: text.length < 2 ? '' : text });
    }, 500),
    [onFiltersChange]
  );

  const debouncedScoreChange = useMemo(
    () => debounce((value: string, type: 'minScore' | 'maxScore') => {
      onFiltersChange({ [type]: value });
    }, 500),
    [onFiltersChange]
  );

  const debouncedDateChange = useMemo(
    () => debounce((date: Date | null, type: 'startDate' | 'endDate') => {
      onFiltersChange({ [type]: date });
    }, 500),
    [onFiltersChange]
  );

  const handleSearchChange = (text: string) => {
    setLocalSearch(text);
    debouncedSearchChange(text);
  };

  useEffect(() => {
    return () => {
      debouncedSearchChange.cancel();
      debouncedScoreChange.cancel();
      debouncedDateChange.cancel();
    };
  }, [debouncedSearchChange, debouncedScoreChange, debouncedDateChange]);

  return (
    <View className="p-4 border-b border-gray-200">
      <TextInput
        className="border p-2 rounded-lg mb-2"
        placeholder="Поиск по названию"
        value={localSearch}
        onChangeText={handleSearchChange}
      />

      <View className="flex-row space-x-2 mb-2 gap-2">
        <TextInput
          className="border p-2 rounded-lg flex-1"
          placeholder="Мин. оценка"
          value={localMinScore}
          onChangeText={(text) => {
            setLocalMinScore(text);
            debouncedScoreChange(text, 'minScore');
          }}
          keyboardType="numeric"
        />
        <TextInput
          className="border p-2 rounded-lg flex-1"
          placeholder="Макс. оценка"
          value={localMaxScore}
          onChangeText={(text) => {
            setLocalMaxScore(text);
            debouncedScoreChange(text, 'maxScore');
          }}
          keyboardType="numeric"
        />
      </View>

      <DatePickers
        startDate={localStartDate}
        endDate={localEndDate}
        onStartDateChange={(date) => {
          setLocalStartDate(date);
          debouncedDateChange(date, 'startDate');
        }}
        onEndDateChange={(date) => {
          setLocalEndDate(date);
          debouncedDateChange(date, 'endDate');
        }}
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