import React from 'react';
import { Calendar } from 'lucide-react';
import useTeacherStore from '../store/useTeacherStore';
import useScheduleStore from '../store/useScheduleStore';
import { generateSchedule } from '../utils/scheduleGenerator';

const GenerateScheduleButton: React.FC = () => {
  const teachers = useTeacherStore(state => state.teachers);
  const setSchedule = useScheduleStore(state => state.setSchedule);

  const handleGenerateSchedule = () => {
    const schedule = generateSchedule(teachers);
    setSchedule(schedule);
  };

  return (
    <button
      onClick={handleGenerateSchedule}
      className="px-6 py-3 bg-school-green text-white rounded-lg hover:bg-primary-dark disabled:bg-primary/50 transition-colors shadow-sm flex items-center gap-2"
    >
      <Calendar className="w-5 h-5" />
      Generate Schedule
    </button>
  );
};

export default GenerateScheduleButton;