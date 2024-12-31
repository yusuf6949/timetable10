import { Schedule, TimeSlot, Teacher } from '../../types';
import { SIMULTANEOUS_SUBJECTS } from '../../constants/combinations';

export const scheduleSimultaneousSubjects = (
  schedule: Schedule,
  className: string,
  day: string,
  period: number,
  subject: string,
  availableTeachers: Teacher[]
): void => {
  // Find the simultaneous group for this subject
  const simultaneousGroup = Object.values(SIMULTANEOUS_SUBJECTS)
    .find(group => group.includes(subject));

  if (!simultaneousGroup) return;

  // Get other subjects that should be scheduled simultaneously
  const otherSubjects = simultaneousGroup.filter(s => s !== subject);

  // Try to schedule other subjects in parallel
  otherSubjects.forEach(otherSubject => {
    const availableTeacher = availableTeachers.find(teacher =>
      teacher.subjects.some(s => s.subject === otherSubject)
    );

    if (availableTeacher) {
      // Find another class in the same level
      const classLevel = className.substring(0, 2);
      const otherClasses = Object.keys(schedule)
        .filter(cls => 
          cls.startsWith(classLevel) && 
          cls !== className &&
          !schedule[cls][day][period]
        );

      if (otherClasses.length > 0) {
        const otherClass = otherClasses[0];
        schedule[otherClass][day][period] = {
          teacher: availableTeacher.name,
          subject: otherSubject,
          time: schedule[className][day][period].time
        };
      }
    }
  });
};