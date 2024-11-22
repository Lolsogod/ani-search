import { Text } from "react-native";
import type { SortDirection } from "@/types/anime";

export const SortIcon = ({ active, direction }: { active: boolean; direction: SortDirection }) => (
    <Text className={`ml-1 ${active ? 'text-blue-500' : 'text-gray-400'}`}>
      {direction === 'asc' ? '↑' : '↓'}
    </Text>
  );