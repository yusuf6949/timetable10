import React from 'react';
import { DAYS } from '../../constants';

interface DaySelectorProps {
  selectedDays: string[];
  onDayToggle: (day: string) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDays, onDayToggle }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
        Available Days
      </h3>
      <div className="flex gap-2 flex-wrap">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => onDayToggle(day)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedDays.includes(day)
                ? 'bg-primary dark:bg-primary-light text-white'
                : 'bg-light-hover dark:bg-dark-hover text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {day.substring(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;