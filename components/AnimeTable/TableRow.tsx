import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { AnimeData, VisibleColumns } from './types';

interface TableRowProps {
  item: AnimeData;
  index: number;
  visibleColumns: VisibleColumns;
}

export const TableRow = React.memo(({ item, visibleColumns }: TableRowProps) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 640;

  const renderMobileColumns = () => {
    if (visibleColumns === 'type-score') {
      return (
        <>
          <Text className="w-16 text-center text-gray-600">
            {item.type}
          </Text>
          <Text className="w-20 text-center">
            {item.score ? item.score.toFixed(2) : 'N/A'}
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Text className="w-24 text-center text-gray-600">
            {item.members ? item.members.toLocaleString() : 'N/A'}
          </Text>
          <Text className="w-16 text-center text-gray-600">
            {item.episodes || 'N/A'}
          </Text>
        </>
      );
    }
  };

  return (
    <View className="flex-row border-b border-gray-200 p-2 items-center hover:bg-gray-50">
      <Text className="flex-[2] text-blue-600" numberOfLines={1}>
        {item.title}
      </Text>

      {isMobile ? renderMobileColumns() : (
        <>
          <Text className="w-16 text-center text-gray-600">
            {item.type}
          </Text>
          <Text className="w-20 text-center">
            {item.score ? item.score.toFixed(2) : 'N/A'}
          </Text>
          <Text className="w-24 text-center text-gray-600">
            {item.members ? item.members.toLocaleString() : 'N/A'}
          </Text>
          <Text className="w-16 text-center text-gray-600">
            {item.episodes || 'N/A'}
          </Text>
        </>
      )}
    </View>
  );
});

TableRow.displayName = 'TableRow';