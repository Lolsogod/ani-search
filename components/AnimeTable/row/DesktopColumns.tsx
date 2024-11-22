import { Text } from "react-native";
import type { ColumnProps } from "./props";
import React from "react";

export const DesktopColumns: React.FC<ColumnProps> = React.memo(({ item }) => (
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

DesktopColumns.displayName = 'DesktopColumns';