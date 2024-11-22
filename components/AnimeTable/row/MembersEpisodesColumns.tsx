import { Text } from "react-native";
import type { ColumnProps } from "./props";

export const MembersEpisodesColumns: React.FC<ColumnProps> = ({ item }) => (
    <>
      <Text className="w-24 text-center text-gray-600">
        {item.members ? item.members.toLocaleString() : 'N/A'}
      </Text>
      <Text className="w-16 text-center text-gray-600">
        {item.episodes || 'N/A'}
      </Text>
    </>
);

MembersEpisodesColumns.displayName = 'MembersEpisodesColumns';