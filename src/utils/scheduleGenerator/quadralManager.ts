import { Schedule, TimeSlot } from '../../types';
import { QUADRAL_SLOTS, SUBJECT_CATEGORIES, PERIOD_RULES } from '../../constants/subjects';

export const isQuadralSubject = (subject: string, className: string): boolean => {
  const classLevel = className.substring(0, 2);
  const isALevel = ['S5', 'S6'].includes(classLevel);
  const isUpperOLevel = ['S3', 'S4'].includes(classLevel);

  // Check if subject needs quadral based on class level and subject type
  if (isALevel) {
    return SUBJECT_CATEGORIES.SCIENCES.includes(subject) || 
           SUBJECT_CATEGORIES.ARTS.includes(subject);
  }

  if (isUpperOLevel) {
    return SUBJECT_CATEGORIES.SCIENCES.includes(subject);
  }

  return false;
};

export const getRequiredQuadrals = (subject: string, className: string): number => {
  const classLevel = className.substring(0, 2);
  const isALevel = ['S5', 'S6'].includes(classLevel);

  if (isALevel) {
    if (SUBJECT_CATEGORIES.SCIENCES.includes(subject)) {
      return PERIOD_RULES.ALEVEL.SCIENCES.QUADRALS_PER_WEEK;
    }
    if (SUBJECT_CATEGORIES.ARTS.includes(subject)) {
      return PERIOD_RULES.ALEVEL.ARTS.QUADRALS_PER_WEEK;
    }
  }

  if (['S3', 'S4'].includes(classLevel) && SUBJECT_CATEGORIES.SCIENCES.includes(subject)) {
    return PERIOD_RULES.OLEVEL.SCIENCES.QUADRALS_PER_WEEK;
  }

  return 0;
};

export const findAvailableQuadralSlot = (
  schedule: Schedule,
  className: string,
  day: string
): number | null => {
  for (const slot of QUADRAL_SLOTS) {
    let isSlotAvailable = true;
    
    // Check if all periods in the slot are available
    for (let period = slot.start; period <= slot.end; period++) {
      if (schedule[className][day][period]) {
        isSlotAvailable = false;
        break;
      }
    }

    if (isSlotAvailable) {
      return slot.start;
    }
  }

  return null;
};

export const assignQuadral = (
  schedule: Schedule,
  className: string,
  day: string,
  startPeriod: number,
  slot: TimeSlot
): void => {
  const quadralSlot = QUADRAL_SLOTS.find(qs => qs.start === startPeriod);
  if (!quadralSlot) return;

  // Assign all periods in the quadral
  for (let period = quadralSlot.start; period <= quadralSlot.end; period++) {
    schedule[className][day][period] = {
      ...slot,
      isQuadralPeriod: true,
      quadralIndex: period - quadralSlot.start
    };
  }
};