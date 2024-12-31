interface PeriodCount {
  quadrals: number;
  doubles: number;
  singles: number;
}

export class PeriodTracker {
  private counts: Map<string, Map<string, PeriodCount>> = new Map();

  constructor() {
    // Initialize counters for each class and subject
    ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].forEach(level => {
      this.counts.set(level, new Map());
    });
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

  hasMetRequirements(classLevel: string, subject: string, requirements: PeriodRequirement[]): boolean {
    const counts = this.getPeriodCounts(classLevel, subject);
    
    return requirements.every(req => {
      const current = counts[`${req.type}s`];
      return current >= req.count;
    });
  }
}