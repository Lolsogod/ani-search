import { TouchableOpacity } from "react-native";
import { SortDirection } from "@/types/anime";
import { OrderBy } from "@/types/anime";
import { Text } from "react-native";
import { SortIcon } from "./SortIcon";

export const SortableColumn = ({
    width,
    field,
    label,
    orderBy,
    sortDirection,
    onSort,
    numberOfLines = 1,
    className = 'justify-center'
  }: {
    width: string;
    field: OrderBy;
    label: string;
    orderBy: OrderBy;
    sortDirection: SortDirection;
    onSort: (field: OrderBy) => void;
    numberOfLines?: number;
    className?: string;
  }) => (
    <TouchableOpacity
      className={`${width} flex-row items-center ${className}`}
      onPress={() => onSort(field)}
      accessibilityLabel={`Сортировать по ${label}`}
    >
      <Text className="font-bold" numberOfLines={numberOfLines}>{label}</Text>
      <SortIcon active={orderBy === field} direction={sortDirection} />
    </TouchableOpacity>
  );