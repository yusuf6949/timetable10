import { Teacher } from '../../types';

export const initializeTeacherAssignments = (teachers: Teacher[]) => {
  return teachers.map(teacher => ({
    ...teacher,
    periodsAssigned: 0,
    dailyAssignments: {} as { [key: string]: number },
    dailyClassAssignments: {} as { [key: string]: string[] },
    periodAssignments: {} as {
      [day: string]: {
        [periodId: number]: string;
      };
    }
  }));
};