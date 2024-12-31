import { OptionalSubjectManager } from './optionalSubjectManager';
import { Schedule } from '../../types';

export class SubjectCollisionManager {
  private optionalManager: OptionalSubjectManager;

  constructor() {
    this.optionalManager = new OptionalSubjectManager();
  }

  canScheduleSubject(
    subject: string,
    className: string,
    day: string,
    period: number,
    schedule: Schedule
  ): boolean {
    // Get all subjects scheduled in this period for the same year level
    const classLevel = className.substring(0, 2);
    const scheduledSubjects = Object.keys(schedule)
      .filter(cls => cls.startsWith(classLevel))
      .map(cls => schedule[cls][day]?.[period]?.subject)
      .filter(Boolean);

    // Check each scheduled subject for collisions
    for (const scheduledSubject of scheduledSubjects) {
      if (!this.optionalManager.canScheduleTogether(subject, scheduledSubject)) {
        return false;
      }
    }

    // Check if this is a preferred time slot
    if (!this.optionalManager.isPreferredTimeSlot(subject, period)) {
      return false;
    }

    return true;
  }

  getValidSubjectsForSlot(
    availableSubjects: string[],
    className: string,
    day: string,
    period: number,
    schedule: Schedule
  ): string[] {
    return availableSubjects.filter(subject =>
      this.canScheduleSubject(subject, className, day, period, schedule)
    );
  }
}