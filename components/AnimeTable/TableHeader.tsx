import { View, Text, TouchableOpacity } from 'react-native';
import { OrderBy, SortDirection } from './types';

interface TableHeaderProps {
  orderBy: OrderBy;
  sortDirection: SortDirection;
  onSort: (field: OrderBy) => void;
}

const SortIcon = ({ active, direction }: { active: boolean; direction: SortDirection }) => (
  <Text className={`ml-1 ${active ? 'text-blue-500' : 'text-gray-400'}`}>
    {direction === 'asc' ? '↑' : '↓'}
  </Text>
);

export const TableHeader = ({ orderBy, sortDirection, onSort }: TableHeaderProps) => (
  <View className="flex-row bg-gray-100 p-2 border-b border-gray-300">
    <TouchableOpacity
      className="flex-1 flex-row items-center"
      onPress={() => onSort('title')}
    >
      <Text className="font-bold">Название</Text>
      <SortIcon active={orderBy === 'title'} direction={sortDirection} />
    </TouchableOpacity>

    <Text className="w-20 text-center font-bold">Тип</Text>

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
      <Text className="font-bold">Пользователи</Text>
      <SortIcon active={orderBy === 'members'} direction={sortDirection} />
    </TouchableOpacity>

    <TouchableOpacity
      className="w-20 flex-row items-center justify-center"
      onPress={() => onSort('episodes')}
    >
      <Text className="font-bold">Серии</Text>
      <SortIcon active={orderBy === 'episodes'} direction={sortDirection} />
    </TouchableOpacity>
  </View>
);