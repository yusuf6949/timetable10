import { Teacher } from '../../types';
import { TeacherIdentityManager } from './teacherIdentityManager';

interface TeacherScheduleSlot {
  class: string;
  subject: string;
  period: number;
}

interface TeacherDaySchedule {
  [period: number]: TeacherScheduleSlot;
}

export class TeacherCollisionManager {
  private schedules: Map<string, Map<string, TeacherDaySchedule>> = new Map();
  private identityManager: TeacherIdentityManager;

  constructor(teachers: Teacher[]) {
    this.identityManager = new TeacherIdentityManager(teachers);
    teachers.forEach(teacher => {
      this.schedules.set(teacher.name, new Map());
    });
  }

  isTeacherAvailable(
    teacherName: string,
    day: string,
    period: number,
    className: string
  ): boolean {
    // Get teacher's schedule
    const teacherSchedule = this.schedules.get(teacherName);
    if (!teacherSchedule) return false;

    // Check if already scheduled in this period
    const daySchedule = teacherSchedule.get(day);
    if (daySchedule?.[period]) return false;

    // Check for collisions with same teacher under different names
    for (const [name, schedule] of this.schedules.entries()) {
      if (this.identityManager.isSameTeacher(teacherName, name)) {
        const otherDaySchedule = schedule.get(day);
        if (otherDaySchedule?.[period]) return false;
      }
    }

    // Check consecutive periods limit
    const consecutivePeriods = this.getConsecutivePeriods(teacherName, day, period);
    if (consecutivePeriods >= 3) return false;

    // Check daily teaching load
    const dailyLoad = this.getDailyTeachingLoad(teacherName, day);
    if (dailyLoad >= 6) return false;

    return true;
  }

  scheduleTeacher(
    teacherName: string,
    day: string,
    period: number,
    className: string,
    subject: string
  ): void {
    const teacherSchedule = this.schedules.get(teacherName);
    if (!teacherSchedule) return;

    if (!teacherSchedule.has(day)) {
      teacherSchedule.set(day, {});
    }

    const daySchedule = teacherSchedule.get(day)!;
    daySchedule[period] = { class: className, subject, period };
  }

  private getConsecutivePeriods(
    teacherName: string,
    day: string,
    currentPeriod: number
  ): number {
    let consecutive = 1;
    const schedule = this.schedules.get(teacherName)?.get(day);
    if (!schedule) return consecutive;

    // Check backwards
    let period = currentPeriod - 1;
    while (schedule[period]) {
      consecutive++;
      period--;
    }

    // Check forwards
    period = currentPeriod + 1;
    while (schedule[period]) {
      consecutive++;
      period++;
    }

    return consecutive;
  }

  private getDailyTeachingLoad(teacherName: string, day: string): number {
    let total = 0;
    
    // Sum up periods for all instances of this teacher
    for (const [name, schedule] of this.schedules.entries()) {
      if (this.identityManager.isSameTeacher(teacherName, name)) {
        const daySchedule = schedule.get(day);
        if (daySchedule) {
          total += Object.keys(daySchedule).length;
        }
      }
    }
    
    return total;
  }

  getTeacherCurrentClass(
    teacherName: string,
    day: string,
    period: number
  ): string | null {
    for (const [name, schedule] of this.schedules.entries()) {
      if (this.identityManager.isSameTeacher(teacherName, name)) {
        const slot = schedule.get(day)?.[period];
        if (slot) return slot.class;
      }
    }
    return null;
  }
}