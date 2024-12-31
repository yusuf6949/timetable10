import { Teacher } from '../../types';

export class TeacherWorkloadManager {
  private workloads: Map<string, number> = new Map();
  private weeklyLimits: Map<string, number> = new Map();

  constructor(teachers: Teacher[]) {
    teachers.forEach(teacher => {
      this.workloads.set(teacher.name, 0);
      // Set weekly limits based on subject count and availability
      const weeklyLimit = this.calculateWeeklyLimit(teacher);
      this.weeklyLimits.set(teacher.name, weeklyLimit);
    });
  }

  private calculateWeeklyLimit(teacher: Teacher): number {
    // Adjust limits based on subject types
    const hasSciences = teacher.subjects.some(s => 
      ['Physics', 'Chemistry', 'Biology', 'Mathematics'].includes(s.subject)
    );
    const baseLimit = hasSciences ? 28 : 24;
    const availableDays = teacher.availableDays.length;
    
    // Adjust limit based on availability and subjects
    return Math.min(baseLimit, availableDays * 4);
  }

  canAddPeriod(teacherName: string): boolean {
    const currentLoad = this.workloads.get(teacherName) || 0;
    const weeklyLimit = this.weeklyLimits.get(teacherName) || 24;
    
    // Get daily distribution
    const dailyLoads = this.getDailyDistribution(teacherName);
    const maxDailyLoad = Math.max(...Object.values(dailyLoads));
    const minDailyLoad = Math.min(...Object.values(dailyLoads));
    
    // Ensure even distribution (max 2 periods difference between days)
    return currentLoad < weeklyLimit && (maxDailyLoad - minDailyLoad) <= 2;
  }

  getDailyDistribution(teacherName: string): Record<string, number> {
    // Implementation to track daily loads
    return this.dailyLoads.get(teacherName) || {};
  }

  addPeriod(teacherName: string): void {
    const currentLoad = this.workloads.get(teacherName) || 0;
    this.workloads.set(teacherName, currentLoad + 1);
  }

  getWorkload(teacherName: string): number {
    return this.workloads.get(teacherName) || 0;
  }

  getWeeklyLimit(teacherName: string): number {
    return this.weeklyLimits.get(teacherName) || 24;
  }
}