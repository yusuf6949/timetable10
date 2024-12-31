import { ALEVEL_COMBINATIONS, SIMULTANEOUS_SUBJECTS } from '../../constants/combinations';

export const isValidCombination = (subjects: string[]): boolean => {
  // Check in science combinations
  for (const combo of Object.values(ALEVEL_COMBINATIONS.SCIENCES)) {
    if (subjects.every(subject => combo.includes(subject))) {
      return true;
    }
  }

  // Check in arts combinations
  for (const combo of Object.values(ALEVEL_COMBINATIONS.ARTS)) {
    if (subjects.every(subject => combo.includes(subject))) {
      return true;
    }
  }

  return false;
};

export const getSimultaneousGroup = (subject: string): string[] | null => {
  for (const [_, subjects] of Object.entries(SIMULTANEOUS_SUBJECTS)) {
    if (subjects.includes(subject)) {
      return subjects;
    }
  }
  return null;
};

export const mustBeSimultaneous = (subject1: string, subject2: string): boolean => {
  const group = getSimultaneousGroup(subject1);
  return group !== null && group.includes(subject2);
};

export const getValidCombinationsForSubject = (subject: string): string[][] => {
  const combinations: string[][] = [];

  // Check science combinations
  Object.values(ALEVEL_COMBINATIONS.SCIENCES).forEach(combo => {
    if (combo.includes(subject)) {
      combinations.push(combo);
    }
  });

  // Check arts combinations
  Object.values(ALEVEL_COMBINATIONS.ARTS).forEach(combo => {
    if (combo.includes(subject)) {
      combinations.push(combo);
    }
  });

  return combinations;
};