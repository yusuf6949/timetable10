import { TIME_PERIODS } from '../../constants';

export class BreakTimeManager {
  private breakPeriods: Set<string | number>;

  constructor() {
    this.breakPeriods = new Set(
      TIME_PERIODS
        .filter(period => period.type === 'break')
        .map(period => period.id)
    );
  }

  isBreakPeriod(periodId: string | number): boolean {
    return this.breakPeriods.has(periodId);
  }

  getBreakLabel(periodId: string | number): string {
    const period = TIME_PERIODS.find(p => p.id === periodId);
    return period?.label || '';
  }

  getNextTeachingPeriod(currentPeriod: number): number {
    const periods = TIME_PERIODS.map(p => p.id);
    const currentIndex = periods.indexOf(currentPeriod);
    
    for (let i = currentIndex + 1; i < periods.length; i++) {
      if (!this.isBreakPeriod(periods[i])) {
        return periods[i] as number;
      }
    }
    
    return -1; // No more teaching periods today
  }
}