import { SUBJECT_CATEGORIES } from '../../constants';

export interface PeriodRequirement {
  type: 'quadral' | 'double' | 'single';
  count: number;
}

export class PeriodRequirementManager {
  getRequirements(subject: string, classLevel: string): PeriodRequirement[] {
    const isALevel = ['S5', 'S6'].includes(classLevel);
    const isUpperOLevel = ['S3', 'S4'].includes(classLevel);

    // A-Level Sciences (3 quadrals per week)
    if (isALevel && SUBJECT_CATEGORIES.SCIENCE.includes(subject)) {
      return [
        { type: 'quadral', count: 3 },
        { type: 'double', count: 1 }
      ];
    }

    // A-Level Arts (2 quadrals per week)
    if (isALevel && SUBJECT_CATEGORIES.ARTS.includes(subject)) {
      return [
        { type: 'quadral', count: 2 },
        { type: 'double', count: 1 }
      ];
    }

    // O-Level Sciences (1 quadral + doubles)
    if (isUpperOLevel && SUBJECT_CATEGORIES.SCIENCE.includes(subject)) {
      return [
        { type: 'quadral', count: 1 },
        { type: 'double', count: 2 }
      ];
    }

    // Optional subjects (1 quadral per week)
    if (isUpperOLevel && SUBJECT_CATEGORIES.OPTIONAL.includes(subject)) {
      return [
        { type: 'quadral', count: 1 },
        { type: 'single', count: 2 }
      ];
    }

    // Other subjects (at least one double)
    return [
      { type: 'double', count: 1 },
      { type: 'single', count: 3 }
    ];
  }

  isQuadralPeriod(period: number): boolean {
    // Quadrals should be morning periods (1-2 or 3-4)
    return period === 1 || period === 3;
  }

  canScheduleQuadral(period: number, subject: string): boolean {
    // Sciences should have morning quadrals
    if (SUBJECT_CATEGORIES.SCIENCE.includes(subject)) {
      return period === 1; // First two periods
    }
    return period === 1 || period === 3; // More flexible for other subjects
  }
}