import { Schedule, TimeSlot } from '../../types';
import { COMBINATIONS, MUTUALLY_EXCLUSIVE, SUBJECT_CATEGORIES } from '../../constants/subjects';

export const canScheduleTogether = (
  subject1: string,
  subject2: string,
  className: string
): boolean => {
  const classLevel = className.substring(0, 2);
  const isALevel = ['S5', 'S6'].includes(classLevel);

  // If not A-Level, all subjects can be scheduled together if teachers are available
  if (!isALevel) return true;

  // Check mutual exclusions first
  for (const [mainSubject, exclusions] of Object.entries(MUTUALLY_EXCLUSIVE)) {
    if (mainSubject === subject1 && exclusions.includes(subject2) ||
        mainSubject === subject2 && exclusions.includes(subject1)) {
      return false;
    }
  }

  // Geography can be scheduled with any subject
  if (subject1 === 'Geography' || subject2 === 'Geography') {
    return true;
  }

  // For other subjects, check combinations
  const findCombination = (subject: string) => {
    for (const [stream, combinations] of Object.entries(COMBINATIONS)) {
      for (const [combo, subjects] of Object.entries(combinations)) {
        if (subjects.includes(subject)) {
          return { stream, combo };
        }
      }
    }
    return null;
  };

  const combo1 = findCombination(subject1);
  const combo2 = findCombination(subject2);

  // If both subjects are from combinations
  if (combo1 && combo2) {
    // Allow scheduling if from different streams
    return combo1.stream !== combo2.stream;
  }

  return true;
};

export const getPossibleSimultaneousSubjects = (
  subject: string,
  className: string,
  schedule: Schedule,
  day: string,
  period: number
): string[] => {
  const classLevel = className.substring(0, 2);
  const stream = className.substring(2);
  
  // Get all subjects currently scheduled in this period
  const scheduledSubjects = Object.keys(schedule)
    .filter(cls => cls.startsWith(classLevel))
    .map(cls => schedule[cls][day][period]?.subject)
    .filter(Boolean);

  // Get all possible subjects for this class level
  const allSubjects = [...SUBJECT_CATEGORIES.SCIENCES, ...SUBJECT_CATEGORIES.ARTS];
  
  // Filter subjects that can be scheduled together
  return allSubjects.filter(s => 
    s !== subject && 
    !scheduledSubjects.includes(s) &&
    canScheduleTogether(subject, s, className)
  );
};