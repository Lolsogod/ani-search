import React from 'react';
import { View, Text } from 'react-native';
import { AnimeData } from './types';

interface TableRowProps {
  item: AnimeData;
  index: number;
}

export const TableRow = React.memo(({ item }: TableRowProps) => {
  return (
    <View className="flex-row border-b border-gray-200 p-2 items-center hover:bg-gray-50">
      <Text className="flex-1 text-blue-600" numberOfLines={1}>
        {item.title}
      </Text>

      <Text className="w-20 text-center text-gray-600">
        {item.type}
      </Text>

      <Text className="w-20 text-center">
        {item.score ? item.score.toFixed(2) : 'N/A'}
      </Text>

      <Text className="w-24 text-center text-gray-600">
        {item.members ? item.members.toLocaleString() : 'N/A'}
      </Text>

      <Text className="w-20 text-center text-gray-600">
        {item.episodes || 'N/A'}
      </Text>
    </View>
  );
});

TableRow.displayName = 'TableRow';