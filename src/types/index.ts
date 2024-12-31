export interface ClassDayAssignment {
  class: string;
  days: string[];
}

export interface Subject {
  subject: string;
  classes: string[];
  streams: string[];
}

export interface Teacher {
  id: number;
  name: string;
  subjects: Subject[];
  availableDays: string[];
  classDayAssignments: ClassDayAssignment[];
  periodsAssigned: number;
  aLevelOnly?: boolean;
}