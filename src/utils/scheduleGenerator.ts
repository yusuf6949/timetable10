import { Teacher, Schedule, TimePeriod } from '../types';
import { DAYS, TIME_PERIODS, CLASSES, SUBJECT_CATEGORIES } from '../constants';

const initializeTeacherAssignments = (teachers: Teacher[]) => {
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

const isTeacherAvailable = (
  teacher: Teacher,
  day: string,
  periodId: number,
  className: string,
  dailyAssignments: { [key: string]: number },
  periodAssignments: { [day: string]: { [periodId: number]: string } },
  dailyClassAssignments: { [key: string]: string[] }
) => {
  // Check if teacher is available on this day
  if (!teacher.availableDays.includes(day)) return false;

  // Check if teacher is already assigned to this period
  if (periodAssignments[day]?.[periodId]) return false;

  // Check daily assignment limit (max 4 periods per day)
  if ((dailyAssignments[day] || 0) >= 4) return false;

  // Check if teacher has already taught this class today (max 2 periods per class per day)
  const classesToday = dailyClassAssignments[day] || [];
  const classCount = classesToday.filter(c => c === className).length;
  if (classCount >= 2) return false;

  return true;
};

const canTeachClass = (teacher: Teacher, className: string, subject: string) => {
  const classLevel = className.substring(0, 2);
  const stream = className.substring(2);
  
  return teacher.subjects.some(s => 
    s.subject === subject &&
    s.classes.includes(classLevel) &&
    (classLevel !== 'S5' && classLevel !== 'S6' || s.streams.includes(stream))
  );
};

export const generateSchedule = (teachers: Teacher[]): Schedule => {
  const schedule: Schedule = {};
  const teacherAssignments = initializeTeacherAssignments(teachers);

  // Initialize empty schedule
  CLASSES.forEach(className => {
    schedule[className] = {};
    DAYS.forEach(day => {
      schedule[className][day] = {};
    });
  });

  // Main scheduling loop
  CLASSES.forEach(className => {
    DAYS.forEach(day => {
      TIME_PERIODS.forEach(period => {
        const availableTeachers = teacherAssignments.filter(teacher => {
          const canTeach = teacher.subjects.some(subject => 
            canTeachClass(teacher, className, subject.subject)
          );
          
          return canTeach && isTeacherAvailable(
            teacher,
            day,
            period.id,
            className,
            teacher.dailyAssignments,
            teacher.periodAssignments,
            teacher.dailyClassAssignments
          );
        });

        if (availableTeachers.length > 0) {
          // Sort teachers by workload to ensure fair distribution
          availableTeachers.sort((a, b) => a.periodsAssigned - b.periodsAssigned);
          
          const selectedTeacher = availableTeachers[0];
          const selectedSubject = selectedTeacher.subjects.find(s => 
            canTeachClass(selectedTeacher, className, s.subject)
          )?.subject;

          if (selectedSubject) {
            // Update schedule
            schedule[className][day][period.id] = {
              teacher: selectedTeacher.name,
              subject: selectedSubject,
              time: period.time
            };

            // Update teacher assignments
            const teacherIndex = teacherAssignments.findIndex(t => t.id === selectedTeacher.id);
            teacherAssignments[teacherIndex] = {
              ...selectedTeacher,
              periodsAssigned: selectedTeacher.periodsAssigned + 1,
              dailyAssignments: {
                ...selectedTeacher.dailyAssignments,
                [day]: (selectedTeacher.dailyAssignments[day] || 0) + 1
              },
              dailyClassAssignments: {
                ...selectedTeacher.dailyClassAssignments,
                [day]: [...(selectedTeacher.dailyClassAssignments[day] || []), className]
              },
              periodAssignments: {
                ...selectedTeacher.periodAssignments,
                [day]: {
                  ...(selectedTeacher.periodAssignments[day] || {}),
                  [period.id]: className
                }
              }
            };
          }
        }
      });
    });
  });

  return schedule;
};