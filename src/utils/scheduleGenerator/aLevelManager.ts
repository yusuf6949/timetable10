import { Schedule, TimeSlot, Teacher } from '../../types';
import { SUBJECT_CATEGORIES, SIMULTANEOUS_RULES } from '../../constants/subjects';

export const isALevelClass = (className: string): boolean => {
  return ['S5', 'S6'].includes(className.substring(0, 2));
};

export const getSimultaneousGroup = (subject: string): string | null => {
  for (const [groupKey, subjects] of Object.entries(SUBJECT_CATEGORIES.ALEVEL_SIMULTANEOUS)) {
    if (subjects.includes(subject)) {
      return groupKey;
    }
  }
  return null;
};

export const canScheduleSimultaneously = (
  subject1: string,
  subject2: string,
  schedule: Schedule,
  className: string,
  day: string,
  period: number
): boolean => {
  const group1 = getSimultaneousGroup(subject1);
  const group2 = getSimultaneousGroup(subject2);

  // If subjects are from different groups, they can't be scheduled together
  if (group1 !== group2) return false;

  // If no group is found, they're not meant to be simultaneous
  if (!group1) return false;

  // Check if adding these subjects would exceed maximum simultaneous subjects
  const currentSimultaneous = Object.values(schedule)
    .filter(cls => cls[day]?.[period])
    .map(cls => cls[day][period].subject)
    .filter(sub => getSimultaneousGroup(sub) === group1);

  const maxSimultaneous = SIMULTANEOUS_RULES.ALEVEL.MAX_SIMULTANEOUS[group1];
  return currentSimultaneous.length < maxSimultaneous;
};

export const getOtherSimultaneousSubjects = (subject: string): string[] => {
  const group = getSimultaneousGroup(subject);
  if (!group) return [];

  return SUBJECT_CATEGORIES.ALEVEL_SIMULTANEOUS[group].filter(s => s !== subject);
};

export const isPreferredPeriod = (subject: string, period: number): boolean => {
  const isScience = SUBJECT_CATEGORIES.ALEVEL_COMBINATIONS.SCIENCES.COMBO1.includes(subject) ||
                   SUBJECT_CATEGORIES.ALEVEL_COMBINATIONS.SCIENCES.COMBO2.includes(subject) ||
                   SUBJECT_CATEGORIES.ALEVEL_COMBINATIONS.SCIENCES.COMBO3.includes(subject);

  if (isScience) {
    return SIMULTANEOUS_RULES.ALEVEL.PREFERRED_PERIODS.SCIENCES.includes(period);
  }

  return SIMULTANEOUS_RULES.ALEVEL.PREFERRED_PERIODS.ARTS.includes(period);
};