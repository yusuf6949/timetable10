import { create } from 'zustand';
import { Schedule } from '../types';

interface ScheduleStore {
  schedule: Schedule;
  selectedClass: string;
  setSchedule: (schedule: Schedule) => void;
  setSelectedClass: (className: string) => void;
}

const useScheduleStore = create<ScheduleStore>((set) => ({
  schedule: {},
  selectedClass: 'S5A',
  setSchedule: (schedule) => set({ schedule }),
  setSelectedClass: (className) => set({ selectedClass: className })
}));

export default useScheduleStore;