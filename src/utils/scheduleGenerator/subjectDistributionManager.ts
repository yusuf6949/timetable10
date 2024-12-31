import { S3_S4_SUBJECTS } from '../../constants/subjectCategories';
import { Schedule } from '../../types';

export class SubjectDistributionManager {
  private subjectCounts: Map<string, Map<string, number>> = new Map();

  initializeClass(className: string) {
    this.subjectCounts.set(className, new Map());
  }

  canScheduleSubject(
    subject: string,
    className: string,
    day: string
  ): boolean {
    const classCounts = this.subjectCounts.get(className);
    if (!classCounts) return false;

    // Get weekly count for this subject
    const weeklyCount = Array.from(classCounts.values())
      .reduce((sum, count) => sum + count, 0);

    // Get required periods based on subject type
    const requiredPeriods = S3_S4_SUBJECTS.COMPULSORY.includes(subject)
      ? S3_S4_SUBJECTS.PERIODS_PER_WEEK.COMPULSORY
      : S3_S4_SUBJECTS.PERIODS_PER_WEEK.OPTIONAL;

    // Check if we've reached the weekly limit
    if (weeklyCount >= requiredPeriods) return false;

    // Get daily count for this subject
    const dailyCount = classCounts.get(day) || 0;
    
    // Maximum 2 periods per day for any subject
    return dailyCount < 2;
  }

  recordSubject(
    subject: string,
    className: string,
    day: string
  ): void {
    const classCounts = this.subjectCounts.get(className);
    if (!classCounts) return;

    const currentCount = classCounts.get(day) || 0;
    classCounts.set(day, currentCount + 1);
  }

  getSubjectCount(
    subject: string,
    className: string
  ): number {
    const classCounts = this.subjectCounts.get(className);
    if (!classCounts) return 0;

    return Array.from(classCounts.values())
      .reduce((sum, count) => sum + count, 0);
  }
}