import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

interface DatePickersProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

type WebDatePickerProps = {
  value: Date | null;
  onChange: (date: Date) => void;
};

const formatDate = (date: Date | null): string => {
  return date ? date.toISOString().split('T')[0] : '';
};

const WebDatePicker = ({ value, onChange }: WebDatePickerProps) => (
  <input
    type="date"
    value={formatDate(value)}
    onChange={(e) => onChange(new Date(e.target.value))}
    className="border p-2 rounded-lg flex-1"
  />
);

export const DatePickers = ({ startDate, endDate, onStartDateChange, onEndDateChange }: DatePickersProps) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartDateChange = (event: any, date?: Date) => {
    setShowStartPicker(false);
    date && onStartDateChange(date);
  };

  const handleEndDateChange = (event: any, date?: Date) => {
    setShowEndPicker(false);
    date && onEndDateChange(date);
  };

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
              onChange={handleStartDateChange}
            />
          )}

          {showEndPicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
            />
          )}
        </>
      )}
    </View>
  );
};