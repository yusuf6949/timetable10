import { Teacher } from '../../../types';
import { TeacherTimeSlot, TimeSlot } from './TeacherTimeSlot';

export class TeacherConstraints {
  private timeSlots: TeacherTimeSlot;
  
  constructor() {
    this.timeSlots = new TeacherTimeSlot();
  }

  canAssignTeacher(
    teacher: Teacher,
    day: string,
    period: number,
    className: string
  ): boolean {
    // Check for direct time slot collision
    if (this.timeSlots.hasCollision(teacher, day, period)) {
      return false;
    }

    // Check daily assignment limit (max 4 periods per day)
    const dailyAssignments = this.timeSlots.getDailyAssignments(teacher, day);
    if (dailyAssignments.length >= 4) {
      return false;
    }

    // Check consecutive periods (max 2)
    if (this.wouldExceedConsecutivePeriods(teacher, day, period)) {
      return false;
    }

    // Check class assignments per day (max 2 periods per class)
    const classAssignments = dailyAssignments.filter(
      slot => slot.className === className
    );
    if (classAssignments.length >= 2) {
      return false;
    }

    return true;
  }

  assignTeacher(teacher: Teacher, day: string, period: number, className: string): void {
    this.timeSlots.addAssignment(teacher, { day, period, className });
  }

  private wouldExceedConsecutivePeriods(
    teacher: Teacher,
    day: string,
    period: number
  ): boolean {
    const dailySlots = this.timeSlots.getDailyAssignments(teacher, day);
    const consecutive = dailySlots.filter(slot => 
      Math.abs(slot.period - period) <= 1
    ).length;
    
    return consecutive >= 2;
  }
}