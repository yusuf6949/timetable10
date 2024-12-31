import { TeacherCollisionManager } from './teacherCollisionManager';
import { TeacherWorkloadManager } from './teacherWorkloadManager';
import { TimePreferenceManager } from './timePreferenceManager';
import { SubjectCollisionManager } from './subjectCollisionManager';
import { BreakTimeManager } from './breakTimeManager';
import { SubjectDistributionManager } from './subjectDistributionManager';
import { LabSessionManager } from './labSessionManager';
import { ResourceConflictManager } from './resourceConflictManager';
import { Schedule, Teacher } from '../../types';

export class SchedulerIntegration {
  private collisionManager: TeacherCollisionManager;
  private workloadManager: TeacherWorkloadManager;
  private timeManager: TimePreferenceManager;
  private subjectManager: SubjectCollisionManager;
  private breakManager: BreakTimeManager;
  private distributionManager: SubjectDistributionManager;
  private labManager: LabSessionManager;
  private resourceManager: ResourceConflictManager;

  constructor(teachers: Teacher[]) {
    this.collisionManager = new TeacherCollisionManager(teachers);
    this.workloadManager = new TeacherWorkloadManager(teachers);
    this.timeManager = new TimePreferenceManager();
    this.subjectManager = new SubjectCollisionManager();
    this.breakManager = new BreakTimeManager();
    this.distributionManager = new SubjectDistributionManager();
    this.labManager = new LabSessionManager();
    this.resourceManager = new ResourceConflictManager();
  }

  initializeClass(className: string): void {
    this.distributionManager.initializeClass(className);
  }

  canScheduleTeacher(
    teacherName: string,
    subject: string,
    className: string,
    day: string,
    period: number,
    schedule: Schedule
  ): boolean {
    // Check if it's a break period
    if (this.breakManager.isBreakPeriod(period)) {
      return false;
    }

    // Check all constraints
    return (
      this.collisionManager.isTeacherAvailable(teacherName, day, period, className) &&
      this.workloadManager.canAddPeriod(teacherName) &&
      this.timeManager.isPreferredTimeSlot(subject, period) &&
      this.subjectManager.canScheduleSubject(subject, className, day, period, schedule) &&
      this.distributionManager.canScheduleSubject(subject, className, day) &&
      this.labManager.canScheduleLabSession(subject, period, className) &&
      this.resourceManager.canUseResource(subject, period, this.getResourceType(subject))
    );
  }

  scheduleTeacher(
    teacherName: string,
    subject: string,
    className: string,
    day: string,
    period: number
  ): void {
    this.collisionManager.scheduleTeacher(teacherName, day, period, className, subject);
    this.workloadManager.addPeriod(teacherName);
    this.distributionManager.recordSubject(subject, className, day);
    
    // Handle lab sessions and resources
    if (this.isLabSubject(subject)) {
      this.labManager.scheduleLabSession(subject, period, className);
      this.resourceManager.reserveResource(subject, period, 'lab');
    }
  }

  shouldSchedulePE(className: string, day: string): boolean {
    return this.timeManager.shouldSchedulePE(className, day);
  }

  getPESlots(day: string): number[] {
    return this.timeManager.getPESlots(day);
  }

  getTeacherWorkload(teacherName: string): number {
    return this.workloadManager.getWorkload(teacherName);
  }

  private isLabSubject(subject: string): boolean {
    return ['Physics', 'Chemistry', 'Biology'].includes(subject);
  }

  private getResourceType(subject: string): 'lab' | 'field' | 'computer_room' {
    if (['Physics', 'Chemistry', 'Biology'].includes(subject)) {
      return 'lab';
    }
    if (subject === 'P.E') {
      return 'field';
    }
    if (['ICT', 'Computer Studies'].includes(subject)) {
      return 'computer_room';
    }
    return 'lab'; // Default fallback
  }
}