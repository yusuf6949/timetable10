import { Teacher } from '../../types';
import { RULES } from './assignmentRules';

export const distributeWorkload = (teachers: Teacher[], totalPeriods: number) => {
  // Calculate base workload considering subject types
  const calculateBaseWorkload = (teacher: Teacher) => {
    const hasSciences = teacher.subjects.some(s => 
      ['Physics', 'Chemistry', 'Biology', 'Mathematics'].includes(s.subject)
    );
    return hasSciences ? RULES.MIN_PERIODS_PER_TEACHER + 4 : RULES.MIN_PERIODS_PER_TEACHER;
  };

  return teachers.map(teacher => ({
    ...teacher,
    targetWorkload: calculateBaseWorkload(teacher)
  }));
};

export const selectBestTeacher = (
  availableTeachers: Teacher[],
  currentDay: string,
  periodId: number
): Teacher | null => {
  if (!availableTeachers.length) return null;

  // Sort by criteria:
  // 1. Teachers furthest from their target workload
  // 2. Teachers with fewer assignments on the current day
  // 3. Teachers with fewer consecutive periods
  return availableTeachers.sort((a, b) => {
    // Compare distance from target workload
    const aWorkloadDiff = (a.targetWorkload || 0) - (a.periodsAssigned || 0);
    const bWorkloadDiff = (b.targetWorkload || 0) - (b.periodsAssigned || 0);
    
    if (aWorkloadDiff !== bWorkloadDiff) {
      return bWorkloadDiff - aWorkloadDiff;
    }

    // Compare daily assignments
    const aDailyCount = a.dailyAssignments?.[currentDay] || 0;
    const bDailyCount = b.dailyAssignments?.[currentDay] || 0;
    
    if (aDailyCount !== bDailyCount) {
      return aDailyCount - bDailyCount;
    }

    // Compare consecutive periods
    const aConsecutive = getConsecutivePeriods(a, currentDay, periodId);
    const bConsecutive = getConsecutivePeriods(b, currentDay, periodId);
    
    return aConsecutive - bConsecutive;
  })[0];
};

const getConsecutivePeriods = (
  teacher: Teacher,
  day: string,
  currentPeriod: number
): number => {
  if (!teacher.periodAssignments?.[day]) return 0;

  let consecutive = 0;
  for (let i = currentPeriod - 1; i > 0; i--) {
    if (teacher.periodAssignments[day][i]) {
      consecutive++;
    } else {
      break;
    }
  }
  return consecutive;
};