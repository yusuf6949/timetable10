import { Teacher } from '../../types';
import { StreamDistributionManager } from './streamDistribution';

export const selectBestTeacher = (
  availableTeachers: Teacher[],
  classLevel: string,
  stream: string,
  streamManager: StreamDistributionManager
): Teacher | null => {
  // Sort teachers by multiple criteria
  return availableTeachers.sort((a, b) => {
    // First priority: Workload balance
    const workloadDiff = (a.periodsAssigned || 0) - (b.periodsAssigned || 0);
    if (workloadDiff !== 0) return workloadDiff;

    // Second priority: Stream distribution (for all O'level classes)
    if (['S1', 'S2', 'S3', 'S4'].includes(classLevel)) {
      const aStreamLoad = streamManager.getStreamWorkload(classLevel, stream);
      const bStreamLoad = streamManager.getStreamWorkload(classLevel, stream);
      return aStreamLoad - bStreamLoad;
    }

    return 0;
  })[0] || null;
};

export const getSubjectForTeacher = (teacher: Teacher, className: string): string | null => {
  const classLevel = className.substring(0, 2);
  const stream = className.substring(2);

  // Prioritize subjects based on stream workload
  const validSubjects = teacher.subjects.filter(s => 
    s.classes.includes(classLevel) &&
    (classLevel !== 'S5' && classLevel !== 'S6' || s.streams.includes(stream))
  );

  if (!validSubjects.length) return null;

  // For O-level classes, ensure fair distribution
  if (['S1', 'S2', 'S3', 'S4'].includes(classLevel)) {
    // Sort subjects to balance distribution
    validSubjects.sort((a, b) => {
      const aWeight = getSubjectWeight(a.subject);
      const bWeight = getSubjectWeight(b.subject);
      return bWeight - aWeight; // Higher weight subjects first
    });
  }

  return validSubjects[0].subject;
};

// Helper function to weight subjects for balanced distribution
function getSubjectWeight(subject: string): number {
  const weights: Record<string, number> = {
    'Mathematics': 5,
    'Physics': 5,
    'Chemistry': 5,
    'Biology': 5,
    'English': 5,
    // Add weights for other subjects...
  };
  return weights[subject] || 3; // Default weight for other subjects
}