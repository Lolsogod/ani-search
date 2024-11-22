import React from 'react';
import { View, Text, useWindowDimensions, Pressable, Linking } from 'react-native';
import type { VisibleColumns } from './types';
import type { AnimeDataTable } from '@/types/anime';
import { MOBILE_BREAKPOINT } from './constants';

interface ColumnProps {
  item: AnimeDataTable;
}

interface MobileColumnsProps extends ColumnProps {
  visibleColumns: VisibleColumns;
}

const TypeScoreColumns: React.FC<ColumnProps> = ({ item }) => (
  <>
    <Text className="w-16 text-center text-gray-600">
      {item.type}
    </Text>
    <Text className="w-20 text-center">
      {item.score ? item.score.toFixed(2) : 'N/A'}
    </Text>
  </>
);

const MembersEpisodesColumns: React.FC<ColumnProps> = ({ item }) => (
  <>
    <Text className="w-24 text-center text-gray-600">
      {item.members ? item.members.toLocaleString() : 'N/A'}
    </Text>
    <Text className="w-16 text-center text-gray-600">
      {item.episodes || 'N/A'}
    </Text>
  </>
);

const MobileColumns: React.FC<MobileColumnsProps> = React.memo(({ visibleColumns, item }) => {
  if (visibleColumns === 'type-score') {
    return <TypeScoreColumns item={item} />;
  }
  return <MembersEpisodesColumns item={item} />;
});

const DesktopColumns: React.FC<ColumnProps> = React.memo(({ item }) => (
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
));

interface TableRowProps {
  item: AnimeDataTable;
  index: number;
  visibleColumns: VisibleColumns;
}



export const TableRow = React.memo(({ item, visibleColumns }: TableRowProps) => {
  const { width } = useWindowDimensions();
  const isMobile = width < MOBILE_BREAKPOINT;

  return (
    <View className="flex-row border-b border-gray-200 p-2 items-center hover:bg-gray-50">
      <Pressable
        onPress={() => Linking.openURL(`https://myanimelist.net/anime/${item.mal_id}`)}
        className="flex-[2]"
      >
        <Text
          className="text-blue-600"
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </Pressable>

      {isMobile ? (
        <MobileColumns visibleColumns={visibleColumns} item={item} />
      ) : (
        <DesktopColumns item={item} />
      )}
    </View>
  );
});


MobileColumns.displayName = 'MobileColumns';
DesktopColumns.displayName = 'DesktopColumns';
TypeScoreColumns.displayName = 'TypeScoreColumns';
MembersEpisodesColumns.displayName = 'MembersEpisodesColumns';
TableRow.displayName = 'TableRow';