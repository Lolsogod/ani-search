import { Text } from "react-native";
import type { ColumnProps } from "./props";

export const TypeScoreColumns: React.FC<ColumnProps> = ({ item }) => (
    <>
        <Text className="w-16 text-center text-gray-600">
            {item.type}
        </Text>
        <Text className="w-20 text-center">
            {item.score ? item.score.toFixed(2) : 'N/A'}
        </Text>
    </>
);

TypeScoreColumns.displayName = 'TypeScoreColumns';