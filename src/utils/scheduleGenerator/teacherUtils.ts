import { Teacher } from '../../types';
import { isALevelClass } from './aLevelManager';

export const isTeacherAvailable = (
  teacher: Teacher,
  day: string,
  periodId: number,
  className: string,
  dailyAssignments: { [key: string]: number },
  periodAssignments: { [day: string]: { [periodId: number]: string } },
  dailyClassAssignments: { [key: string]: string[] }
): boolean => {
  // Check if teacher is available on this day
  if (!teacher.availableDays.includes(day)) return false;

  // Check class-specific day assignments
  const classAssignment = teacher.classDayAssignments.find(a => a.class === className);
  if (classAssignment && !classAssignment.days.includes(day)) {
    return false;
  }

  // For A-Level classes, check if teacher is qualified
  if (isALevelClass(className) && !teacher.aLevelOnly) {
    const hasALevelSubjects = teacher.subjects.some(s => 
      SUBJECT_CATEGORIES.ALEVEL_COMBINATIONS.ARTS.COMBO1.includes(s.subject) ||
      SUBJECT_CATEGORIES.ALEVEL_COMBINATIONS.ARTS.COMBO2.includes(s.subject) ||
      SUBJECT_CATEGORIES.ALEVEL_COMBINATIONS.ARTS.COMBO3.includes(s.subject) ||
      SUBJECT_CATEGORIES.ALEVEL_COMBINATIONS.SCIENCES.COMBO1.includes(s.subject) ||
      SUBJECT_CATEGORIES.ALEVEL_COMBINATIONS.SCIENCES.COMBO2.includes(s.subject) ||
      SUBJECT_CATEGORIES.ALEVEL_COMBINATIONS.SCIENCES.COMBO3.includes(s.subject)
    );
    if (!hasALevelSubjects) return false;
  }

  // Previous availability checks remain unchanged...
  if (periodAssignments[day]?.[periodId]) return false;
  if ((dailyAssignments[day] || 0) >= 4) return false;
  
  const classesToday = dailyClassAssignments[day] || [];
  const classCount = classesToday.filter(c => c === className).length;
  if (classCount >= 2) return false;

  return true;
};