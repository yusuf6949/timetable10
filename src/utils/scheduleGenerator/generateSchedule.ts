import { Teacher, Schedule } from '../../types';
import { TeacherConstraints } from './collisionPrevention';
import { TeacherStreamManager } from './teacherStreamManager';
import { ScheduleValidator } from './scheduleValidator';
import { selectBestTeacher, getSubjectForTeacher } from './teacherSelection';
import { CLASSES, DAYS, TIME_PERIODS } from '../../constants';

export const generateSchedule = (teachers: Teacher[]): Schedule => {
  const schedule: Schedule = {};
  const constraints = new TeacherConstraints();
  const streamManager = new TeacherStreamManager();
  const validator = new ScheduleValidator();

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
            teacher.subjects.some(s => s.classes.includes(classLevel))
          );

          if (availableTeachers.length > 0) {
            const selectedTeacher = selectBestTeacher(
              availableTeachers,
              classLevel,
              stream,
              streamManager
            );

            if (selectedTeacher) {
              const selectedSubject = getSubjectForTeacher(selectedTeacher, className);
              
              if (selectedSubject) {
                constraints.assignTeacher(selectedTeacher, day, period.id, className);
                
                schedule[className][day][period.id] = {
                  teacher: selectedTeacher.name,
                  subject: selectedSubject,
                  time: period.time
                };

                if (classLevel === 'S3') {
                  streamManager.selectBestStreamForTeacher(selectedTeacher, classLevel, [stream]);
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
      Object.keys(schedule).forEach(className => {
        schedule[className] = {};
        DAYS.forEach(day => {
          schedule[className][day] = {};
        });
      });
    }
  }

  console.warn('Could not generate optimal schedule after maximum attempts');
  return schedule;
};