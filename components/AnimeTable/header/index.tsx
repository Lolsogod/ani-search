import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useMemo } from 'react';
import { MOBILE_BREAKPOINT, COLUMN_SETS } from '../constants';
import { SortableColumn } from './SortableColumn';
import { TableHeaderProps } from './props';

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