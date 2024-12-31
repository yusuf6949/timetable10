import { Teacher } from '../types';
import { getStreamsForClass } from './streamUtils';

export const canTeachStream = (teacher: Teacher, classLevel: string, stream: string): boolean => {
  return teacher.subjects.some(subject => 
    subject.classes.includes(classLevel) && 
    (classLevel !== 'S5' && classLevel !== 'S6' || subject.streams.includes(stream))
  );
};

export const getTeachersForStream = (
  teachers: Teacher[],
  classLevel: string,
  stream: string,
  subject: string
): Teacher[] => {
  return teachers.filter(teacher => 
    teacher.subjects.some(s => 
      s.subject === subject &&
      s.classes.includes(classLevel) &&
      (classLevel !== 'S5' && classLevel !== 'S6' || s.streams.includes(stream))
    )
  );
};

export const isTeacherAvailableForPeriod = (
  teacher: Teacher,
  day: string,
  periodId: number
): boolean => {
  if (!teacher.periodAssignments?.[day]) return true;
  return !teacher.periodAssignments[day][periodId];
};