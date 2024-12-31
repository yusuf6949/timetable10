import { Schedule } from '../../types';

export class ScheduleValidator {
  validateSchedule(schedule: Schedule): boolean {
    const errors: string[] = [];

    // Check for teacher collisions
    const teacherCollisions = this.findTeacherCollisions(schedule);
    if (teacherCollisions.length > 0) {
      errors.push(`Teacher collisions found: ${teacherCollisions.join(', ')}`);
    }

    // Check stream distribution
    const streamDistribution = this.validateStreamDistribution(schedule);
    if (!streamDistribution.isValid) {
      errors.push(`Stream distribution issues: ${streamDistribution.message}`);
    }

    // Log errors if any
    if (errors.length > 0) {
      console.error('Schedule validation failed:', errors);
      return false;
    }

    return true;
  }

  private findTeacherCollisions(schedule: Schedule): string[] {
    const collisions: string[] = [];
    const teacherSlots = new Map<string, Set<string>>();

    Object.entries(schedule).forEach(([className, days]) => {
      Object.entries(days).forEach(([day, periods]) => {
        Object.entries(periods).forEach(([period, slot]) => {
          if (!slot || !slot.teacher) return;

          const timeKey = `${day}-${period}`;
          const current = teacherSlots.get(slot.teacher) || new Set();

          if (current.has(timeKey)) {
            collisions.push(`${slot.teacher} at ${timeKey}`);
          }

          current.add(timeKey);
          teacherSlots.set(slot.teacher, current);
        });
      });
    });

    return collisions;
  }

  private validateStreamDistribution(schedule: Schedule): { isValid: boolean; message: string } {
    const s3Distribution = new Map<string, number>();

    // Count periods per stream for S3
    Object.entries(schedule)
      .filter(([className]) => className.startsWith('S3'))
      .forEach(([className, days]) => {
        const stream = className.charAt(2);
        let count = 0;

        Object.values(days).forEach(periods => {
          count += Object.keys(periods).length;
        });

        s3Distribution.set(stream, (s3Distribution.get(stream) || 0) + count);
      });

    // Check if distribution is balanced
    const loads = Array.from(s3Distribution.values());
    const max = Math.max(...loads);
    const min = Math.min(...loads);

    if (max - min > 2) {
      return {
        isValid: false,
        message: `Uneven distribution: max=${max}, min=${min}`
      };
    }

    return { isValid: true, message: '' };
  }
}