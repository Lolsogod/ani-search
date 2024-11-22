import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useMemo } from 'react';
import type { VisibleColumns } from './types';
import type { OrderBy, SortDirection } from '@/types/anime';
import { MOBILE_BREAKPOINT, COLUMN_SETS } from './constants';

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

const SortableColumn = ({
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

export const TableHeader = ({
  orderBy,
  sortDirection,
  onSort,
  visibleColumns,
  onColumnsToggle
}: TableHeaderProps) => {
  const { width } = useWindowDimensions();
  const isMobile = width < MOBILE_BREAKPOINT;

  const mobileColumnSets = useMemo(() => ({
    'type-score': (
      <>
        <Text className="w-16 text-center font-bold">Тип</Text>
        <SortableColumn
          width="w-20"
          field="score"
          label="Рейтинг"
          orderBy={orderBy}
          sortDirection={sortDirection}
          onSort={onSort}
        />
      </>
    ),
    'members-episodes': (
      <>
        <SortableColumn
          width="w-24"
          field="members"
          label="Польз."
          orderBy={orderBy}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <SortableColumn
          width="w-16"
          field="episodes"
          label="Серии"
          orderBy={orderBy}
          sortDirection={sortDirection}
          onSort={onSort}
        />
      </>
    )
  }), [orderBy, sortDirection, onSort]);

  const renderMobileColumns = useMemo(() =>
    mobileColumnSets[visibleColumns as keyof typeof mobileColumnSets],
    [mobileColumnSets, visibleColumns]
  );

  return (
    <View>
      <View className="flex-row bg-gray-100 p-2 border-b border-gray-300">
        <SortableColumn
          width="flex-[2]"
          field="title"
          label="Название"
          orderBy={orderBy}
          sortDirection={sortDirection}
          onSort={onSort}
          className="justify-start"
        />

        {isMobile ? renderMobileColumns : (
          <>
            <Text className="w-16 text-center font-bold">Тип</Text>
            <SortableColumn
              width="w-20"
              field="score"
              label="Рейтинг"
              orderBy={orderBy}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableColumn
              width="w-24"
              field="members"
              label="Пользователи"
              orderBy={orderBy}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableColumn
              width="w-16"
              field="episodes"
              label="Серии"
              orderBy={orderBy}
              sortDirection={sortDirection}
              onSort={onSort}
            />
          </>
        )}
      </View>
      {isMobile && (
        <TouchableOpacity
          onPress={onColumnsToggle}
          className="bg-gray-100 py-1 px-2 items-center border-b border-gray-300"
          accessibilityLabel="Переключить отображаемые колонки"
        >
          <Text className="text-sm text-blue-500">
            {visibleColumns === COLUMN_SETS.TYPE_SCORE
              ? 'Показать польз./серии'
              : 'Показать тип/рейтинг'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};