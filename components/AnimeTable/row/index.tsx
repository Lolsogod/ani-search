import React from 'react';
import { View, Text, useWindowDimensions, Pressable, Linking } from 'react-native';
import { MOBILE_BREAKPOINT } from '../constants';
import { TableRowProps } from './props';
import { DesktopColumns } from './DesktopColumns';
import { MobileColumns } from './MobileColumns';

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

TableRow.displayName = 'TableRow';