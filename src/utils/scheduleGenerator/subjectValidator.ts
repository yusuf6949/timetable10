import { SUBJECT_RULES } from '../../constants/subjectRules';
import { SUBJECT_CATEGORIES } from '../../constants/subjects';

export const validateSubjectScheduling = (
  subject: string,
  className: string
): boolean => {
  const classLevel = className.substring(0, 2);
  const isOLevel = ['S1', 'S2', 'S3', 'S4'].includes(classLevel);
  
  // Geography handling
  if (subject === 'Geography') {
    if (isOLevel) {
      // In O-level, Geography is compulsory and must be scheduled
      return true;
    } else {
      // In A-level, Geography can be taken by both streams
      return SUBJECT_CATEGORIES.SHARED_SUBJECTS.includes('Geography');
    }
  }

  // Handle other subjects based on level-specific rules
  return isOLevel
    ? SUBJECT_RULES.COMPULSORY.OLEVEL.includes(subject) ||
      SUBJECT_CATEGORIES.OPTIONAL_SUBJECTS.includes(subject)
    : true; // A-level subjects are handled by combination rules
};