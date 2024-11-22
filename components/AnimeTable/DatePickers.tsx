import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

interface DatePickersProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

const WebDatePicker = ({ value, onChange }: { value: Date | null, onChange: (date: Date) => void }) => (
  <input
    type="date"
    value={value ? value.toISOString().split('T')[0] : ''}
    onChange={(e) => onChange(new Date(e.target.value))}
    className="border p-2 rounded-lg flex-1"
  />
);

export const DatePickers = ({ startDate, endDate, onStartDateChange, onEndDateChange }: DatePickersProps) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  return (
    <View className="flex-row gap-2 space-x-2 mb-2">
      {Platform.OS === 'web' ? (
        <>
          <WebDatePicker value={startDate} onChange={onStartDateChange} />
          <WebDatePicker value={endDate} onChange={onEndDateChange} />
        </>
      ) : (
        <>
          <TouchableOpacity
            className="flex-1 border p-2 rounded-lg"
            onPress={() => setShowStartPicker(true)}
          >
            <Text>
              {startDate ? startDate.toISOString().split('T')[0] : 'Начальная дата'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 border p-2 rounded-lg"
            onPress={() => setShowEndPicker(true)}
          >
            <Text>
              {endDate ? endDate.toISOString().split('T')[0] : 'Конечная дата'}
            </Text>
          </TouchableOpacity>

          {showStartPicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowStartPicker(false);
                date && onStartDateChange(date);
              }}
            />
          )}

          {showEndPicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowEndPicker(false);
                date && onEndDateChange(date);
              }}
            />
          )}
        </>
      )}
    </View>
  );
};