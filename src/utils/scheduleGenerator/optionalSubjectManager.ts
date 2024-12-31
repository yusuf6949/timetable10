import { S3_S4_SUBJECTS } from '../../constants/subjectCategories';
import { TIME_PREFERENCES } from '../../constants/timePreferences';

export class OptionalSubjectManager {
  isCompulsorySubject(subject: string): boolean {
    return S3_S4_SUBJECTS.COMPULSORY.includes(subject);
  }

  getOptionalGroup(subject: string): string | null {
    for (const [group, subjects] of Object.entries(S3_S4_SUBJECTS.OPTIONAL)) {
      if (subjects.includes(subject)) {
        return group;
      }
    }
    return null;
  }

  canScheduleTogether(subject1: string, subject2: string): boolean {
    // Get optional groups
    const group1 = this.getOptionalGroup(subject1);
    const group2 = this.getOptionalGroup(subject2);

    // If both are compulsory, they can't be scheduled together
    if (this.isCompulsorySubject(subject1) && this.isCompulsorySubject(subject2)) {
      return false;
    }

    // If both are optional subjects
    if (group1 && group2) {
      // Allow subjects from same group to be scheduled together
      if (group1 === group2) {
        return true;
      }
      // Different optional groups should not clash
      return false;
    }

    // One compulsory and one optional can be scheduled together
    return true;
  }

  isPreferredTimeSlot(subject: string, periodId: number): boolean {
    // Optional subjects are better suited for afternoon slots
    if (!this.isCompulsorySubject(subject)) {
      return TIME_PREFERENCES.AFTERNOON_SLOTS.includes(periodId);
    }
    return true;
  }

  getRequiredPeriodsPerWeek(subject: string): number {
    return this.isCompulsorySubject(subject)
      ? S3_S4_SUBJECTS.PERIODS_PER_WEEK.COMPULSORY
      : S3_S4_SUBJECTS.PERIODS_PER_WEEK.OPTIONAL;
  }
}