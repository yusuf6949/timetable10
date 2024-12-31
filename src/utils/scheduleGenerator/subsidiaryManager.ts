import { Schedule, TimeSlot } from '../../types';
import { SUBSIDIARY_SUBJECTS, MUTUALLY_EXCLUSIVE } from '../../constants/subjects';

export const handleSubsidiarySubjects = (
  schedule: Schedule,
  className: string,
  day: string,
  period: number,
  slot: TimeSlot
): void => {
  // If this is a subsidiary subject
  if (SUBSIDIARY_SUBJECTS.includes(slot.subject)) {
    // Get the other subsidiary subjects that should be scheduled simultaneously
    const simultaneousSubjects = SUBSIDIARY_SUBJECTS.filter(
      sub => sub !== slot.subject
    );

    // Schedule all subsidiary subjects at the same time for both streams
    const streams = ['A', 'B'];
    streams.forEach(stream => {
      const currentClass = `${className.substring(0, 2)}${stream}`;
      schedule[currentClass][day][period] = slot;
      
      // Schedule other subsidiary subjects in parallel
      simultaneousSubjects.forEach(subject => {
        const otherClass = streams.find(s => s !== stream);
        if (otherClass) {
          schedule[`${className.substring(0, 2)}${otherClass}`][day][period] = {
            ...slot,
            subject
          };
        }
      });
    });
  }
};