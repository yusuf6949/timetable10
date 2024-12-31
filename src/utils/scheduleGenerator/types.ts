export interface PeriodRequirement {
  type: 'quadral' | 'double' | 'single';
  count: number;
}

export interface PeriodCount {
  quadrals: number;
  doubles: number;
  singles: number;
}

export interface TimeSlot {
  day: string;
  period: number;
  className: string;
  type?: 'quadral' | 'double' | 'single';
}