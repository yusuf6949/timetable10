import { PeriodRequirement, PeriodCount, TimeSlot } from './types';
import { SUBJECT_CATEGORIES } from '../../constants';

export class PeriodManager {
  private counts: Map<string, Map<string, PeriodCount>> = new Map();

  constructor() {
    ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].forEach(level => {
      this.counts.set(level, new Map());
    });
  }

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

  recordPeriod(classLevel: string, subject: string, type: 'quadral' | 'double' | 'single'): void {
    const subjectCounts = this.counts.get(classLevel)?.get(subject) || {
      quadrals: 0,
      doubles: 0,
      singles: 0
    };

    subjectCounts[`${type}s`]++;
    this.counts.get(classLevel)?.set(subject, subjectCounts);
  }

  getPeriodCounts(classLevel: string, subject: string): PeriodCount {
    return this.counts.get(classLevel)?.get(subject) || {
      quadrals: 0,
      doubles: 0,
      singles: 0
    };
  }

  hasMetRequirements(classLevel: string, subject: string): boolean {
    const requirements = this.getRequirements(subject, classLevel);
    const counts = this.getPeriodCounts(classLevel, subject);
    
    return requirements.every(req => {
      const current = counts[`${req.type}s`];
      return current >= req.count;
    });
  }

  canSchedulePeriodType(period: number, subject: string, type: 'quadral' | 'double' | 'single'): boolean {
    if (type === 'quadral') {
      // Sciences should have morning quadrals
      if (SUBJECT_CATEGORIES.SCIENCE.includes(subject)) {
        return period === 1; // First two periods
      }
      return period === 1 || period === 3; // More flexible for other subjects
    }
    
    return true; // Other period types can be scheduled anytime
  }
}