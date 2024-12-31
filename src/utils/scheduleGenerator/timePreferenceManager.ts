import { TIME_PREFERENCES, SUBJECT_TIME_PREFERENCES } from '../../constants/timePreferences';

export class TimePreferenceManager {
  private peSchedule: Map<string, Set<string>> = new Map(); // className -> days

  isPreferredTimeSlot(subject: string, periodId: number): boolean {
    // PE must be in afternoon slots
    if (subject === 'P.E') {
      return TIME_PREFERENCES.AFTERNOON_SLOTS.includes(periodId);
    }

    // Other subject preferences
    if (SUBJECT_TIME_PREFERENCES.MORNING_PREFERENCE.includes(subject)) {
      return TIME_PREFERENCES.MORNING_SLOTS.includes(periodId);
    }
    
    if (SUBJECT_TIME_PREFERENCES.MIDDAY_PREFERENCE.includes(subject)) {
      return TIME_PREFERENCES.MIDDAY_SLOTS.includes(periodId);
    }
    
    if (SUBJECT_TIME_PREFERENCES.AFTERNOON_PREFERENCE.includes(subject)) {
      return TIME_PREFERENCES.AFTERNOON_SLOTS.includes(periodId);
    }
    
    return true;
  }

  shouldSchedulePE(className: string, day: string): boolean {
    if (!this.peSchedule.has(className)) {
      this.peSchedule.set(className, new Set(this.getPEDaysForClass(className)));
    }
    return this.peSchedule.get(className)!.has(day);
  }

  getPESlots(day: string): number[] {
    // PE should be in last two periods of the day
    return TIME_PREFERENCES.AFTERNOON_SLOTS.slice(-2);
  }

  recordPEScheduled(className: string, day: string): void {
    const days = this.peSchedule.get(className);
    if (days) {
      days.delete(day); // Remove scheduled day
    }
  }

  private getPEDaysForClass(className: string): string[] {
    const classNumber = parseInt(className.substring(1, 2));
    const patterns = {
      1: ['Monday', 'Thursday'],
      2: ['Tuesday', 'Friday'],
      3: ['Wednesday', 'Saturday'],
      4: ['Monday', 'Friday'],
      5: ['Tuesday', 'Saturday'],
      6: ['Wednesday', 'Thursday']
    };
    return patterns[classNumber as keyof typeof patterns] || [];
  }
}