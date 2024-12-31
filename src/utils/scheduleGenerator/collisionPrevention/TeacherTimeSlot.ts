import { Teacher } from '../../../types';

export interface TimeSlot {
  day: string;
  period: number;
  className: string;
}

export class TeacherTimeSlot {
  private assignments: Map<string, TimeSlot[]> = new Map();

  addAssignment(teacher: Teacher, slot: TimeSlot): void {
    const current = this.assignments.get(teacher.id) || [];
    this.assignments.set(teacher.id, [...current, slot]);
  }

  hasCollision(teacher: Teacher, day: string, period: number): boolean {
    const teacherSlots = this.assignments.get(teacher.id) || [];
    return teacherSlots.some(slot => 
      slot.day === day && slot.period === period
    );
  }

  getTeacherAssignments(teacher: Teacher): TimeSlot[] {
    return this.assignments.get(teacher.id) || [];
  }

  getDailyAssignments(teacher: Teacher, day: string): TimeSlot[] {
    return (this.assignments.get(teacher.id) || [])
      .filter(slot => slot.day === day);
  }
}