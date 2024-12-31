import { Teacher, Schedule } from '../../types';
import { TeacherConstraints } from './collisionPrevention';
import { TeacherStreamManager } from './teacherStreamManager';
import { ScheduleValidator } from './scheduleValidator';
import { PeriodManager } from './periodManager';
import { CLASSES, DAYS, TIME_PERIODS } from '../../constants';
import { OptionalSubjectManager } from './optionalSubjectManager';
import { TeacherWorkloadManager } from './teacherWorkloadManager';

export const generateSchedule = (teachers: Teacher[]): Schedule => {
  const schedule: Schedule = {};
  const constraints = new TeacherConstraints();
  const streamManager = new TeacherStreamManager();
  const validator = new ScheduleValidator();
  const periodManager = new PeriodManager();
  const optionalManager = new OptionalSubjectManager();
  const workloadManager = new TeacherWorkloadManager(teachers);

  // Initialize schedule
  CLASSES.forEach(className => {
    schedule[className] = {};
    DAYS.forEach(day => {
      schedule[className][day] = {};
    });
  });

  // Main scheduling loop with retries
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    let success = true;

    // Try to generate schedule
    CLASSES.forEach(className => {
      const classLevel = className.substring(0, 2);
      const stream = className.substring(2);

      DAYS.forEach(day => {
        TIME_PERIODS.forEach(period => {
          if (period.type === 'break') return;

          const availableTeachers = teachers.filter(teacher => 
            constraints.canAssignTeacher(teacher, day, period.id, className) &&
            workloadManager.canAddPeriod(teacher.name) &&
            teacher.subjects.some(s => s.classes.includes(classLevel))
          );

          if (availableTeachers.length > 0) {
            const selectedTeacher = selectBestTeacher(
              availableTeachers,
              classLevel,
              stream,
              streamManager,
              workloadManager
            );

            if (selectedTeacher) {
              const selectedSubject = getSubjectForTeacher(selectedTeacher, className);
              
              if (selectedSubject && optionalManager.canScheduleTogether(selectedSubject, getExistingSubjects(schedule, className, day, period.id))) {
                constraints.assignTeacher(selectedTeacher, day, period.id, className);
                workloadManager.addPeriod(selectedTeacher.name);
                
                schedule[className][day][period.id] = {
                  teacher: selectedTeacher.name,
                  subject: selectedSubject,
                  time: period.time
                };

                if (['S1', 'S2', 'S3', 'S4'].includes(classLevel)) {
                  streamManager.recordAssignment(classLevel, stream);
                }
              } else {
                success = false;
              }
            } else {
              success = false;
            }
          } else {
            success = false;
          }
        });
      });
    });

    // Validate schedule
    if (success && validator.validateSchedule(schedule)) {
      return schedule;
    }

    // Reset and retry
    attempts++;
    if (attempts < maxAttempts) {
      resetSchedule(schedule);
    }
  }

  console.warn('Could not generate optimal schedule after maximum attempts');
  return schedule;
};

function getExistingSubjects(schedule: Schedule, className: string, day: string, periodId: number): string {
  const classLevel = className.substring(0, 2);
  return Object.keys(schedule)
    .filter(cls => cls.startsWith(classLevel) && cls !== className)
    .map(cls => schedule[cls][day][periodId]?.subject)
    .filter(Boolean)[0] || '';
}

function selectBestTeacher(
  availableTeachers: Teacher[],
  classLevel: string,
  stream: string,
  streamManager: TeacherStreamManager,
  workloadManager: TeacherWorkloadManager
): Teacher | null {
  return availableTeachers.sort((a, b) => {
    // First priority: Workload balance
    const aWorkload = workloadManager.getWorkload(a.name);
    const bWorkload = workloadManager.getWorkload(b.name);
    if (aWorkload !== bWorkload) return aWorkload - bWorkload;

    // Second priority: Stream distribution
    if (['S1', 'S2', 'S3', 'S4'].includes(classLevel)) {
      const aStreamLoad = streamManager.getStreamWorkload(stream);
      const bStreamLoad = streamManager.getStreamWorkload(stream);
      return aStreamLoad - bStreamLoad;
    }

    return 0;
  })[0] || null;
}

function getSubjectForTeacher(teacher: Teacher, className: string): string | null {
  const classLevel = className.substring(0, 2);
  const stream = className.substring(2);

  const validSubjects = teacher.subjects.filter(s => 
    s.classes.includes(classLevel) &&
    (classLevel !== 'S5' && classLevel !== 'S6' || s.streams.includes(stream))
  );

  if (!validSubjects.length) return null;

  return validSubjects[0].subject;
}

function resetSchedule(schedule: Schedule): void {
  Object.keys(schedule).forEach(className => {
    schedule[className] = {};
    DAYS.forEach(day => {
      schedule[className][day] = {};
    });
  });
}