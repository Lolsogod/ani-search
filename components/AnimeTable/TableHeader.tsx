import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { OrderBy, SortDirection, VisibleColumns } from './types';

interface TableHeaderProps {
  orderBy: OrderBy;
  sortDirection: SortDirection;
  onSort: (field: OrderBy) => void;
  visibleColumns: VisibleColumns;
  onColumnsToggle: () => void;
}

const SortIcon = ({ active, direction }: { active: boolean; direction: SortDirection }) => (
  <Text className={`ml-1 ${active ? 'text-blue-500' : 'text-gray-400'}`}>
    {direction === 'asc' ? '↑' : '↓'}
  </Text>
);

export const TableHeader = ({ 
  orderBy, 
  sortDirection, 
  onSort,
  visibleColumns,
  onColumnsToggle
}: TableHeaderProps) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 640;

  const renderMobileColumns = () => {
    if (visibleColumns === 'type-score') {
      return (
        <>
          <Text className="w-16 text-center font-bold">Тип</Text>
          <TouchableOpacity
            className="w-20 flex-row items-center justify-center"
            onPress={() => onSort('score')}
          >
            <Text className="font-bold">Рейтинг</Text>
            <SortIcon active={orderBy === 'score'} direction={sortDirection} />
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <>
          <TouchableOpacity
            className="w-24 flex-row items-center justify-center"
            onPress={() => onSort('members')}
          >
            <Text className="font-bold" numberOfLines={1}>Польз.</Text>
            <SortIcon active={orderBy === 'members'} direction={sortDirection} />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-16 flex-row items-center justify-center"
            onPress={() => onSort('episodes')}
          >
            <Text className="font-bold">Серии</Text>
            <SortIcon active={orderBy === 'episodes'} direction={sortDirection} />
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <View>
      <View className="flex-row bg-gray-100 p-2 border-b border-gray-300">
        <TouchableOpacity
          className="flex-[2] flex-row items-center"
          onPress={() => onSort('title')}
        >
          <Text className="font-bold" numberOfLines={1}>Название</Text>
          <SortIcon active={orderBy === 'title'} direction={sortDirection} />
        </TouchableOpacity>

        {isMobile ? renderMobileColumns() : (
          <>
            <Text className="w-16 text-center font-bold">Тип</Text>
            <TouchableOpacity
              className="w-20 flex-row items-center justify-center"
              onPress={() => onSort('score')}
            >
              <Text className="font-bold">Рейтинг</Text>
              <SortIcon active={orderBy === 'score'} direction={sortDirection} />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 flex-row items-center justify-center"
              onPress={() => onSort('members')}
            >
              <Text className="font-bold" numberOfLines={1}>Пользователи</Text>
              <SortIcon active={orderBy === 'members'} direction={sortDirection} />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-16 flex-row items-center justify-center"
              onPress={() => onSort('episodes')}
            >
              <Text className="font-bold">Серии</Text>
              <SortIcon active={orderBy === 'episodes'} direction={sortDirection} />
            </TouchableOpacity>
          </>
        )}
      </View>
      {isMobile && (
        <TouchableOpacity 
          onPress={onColumnsToggle}
          className="bg-gray-100 py-1 px-2 items-center border-b border-gray-300"
        >
          <Text className="text-sm text-blue-500">
            {visibleColumns === 'type-score' ? 'Показать польз./серии' : 'Показать тип/рейтинг'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};