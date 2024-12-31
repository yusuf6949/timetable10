import { Teacher } from '../../types';

export class TeacherIdentityManager {
  private teacherMap: Map<string, Teacher> = new Map();
  private teacherSubjects: Map<string, Set<string>> = new Map();
  private totalWorkload: Map<string, number> = new Map();
  
  constructor(teachers: Teacher[]) {
    teachers.forEach(teacher => {
      const normalizedName = this.normalizeName(teacher.name);
      this.teacherMap.set(normalizedName, teacher);
      this.teacherSubjects.set(
        normalizedName, 
        new Set(teacher.subjects.map(s => s.subject))
      );
      this.totalWorkload.set(normalizedName, 0);
    });
  }

  private normalizeName(name: string): string {
    return name.toLowerCase().trim();
  }

  getTeacher(name: string): Teacher | undefined {
    return this.teacherMap.get(this.normalizeName(name));
  }

  getTeacherSubjects(name: string): Set<string> {
    return this.teacherSubjects.get(this.normalizeName(name)) || new Set();
  }

  isSameTeacher(name1: string, name2: string): boolean {
    return this.normalizeName(name1) === this.normalizeName(name2);
  }

  canTeachSubject(teacherName: string, subject: string): boolean {
    const subjects = this.teacherSubjects.get(this.normalizeName(teacherName));
    return subjects ? subjects.has(subject) : false;
  }

  addWorkload(teacherName: string, periods: number): void {
    const normalized = this.normalizeName(teacherName);
    this.totalWorkload.set(
      normalized,
      (this.totalWorkload.get(normalized) || 0) + periods
    );
  }

  getTotalWorkload(teacherName: string): number {
    return this.totalWorkload.get(this.normalizeName(teacherName)) || 0;
  }

  getTeachersBySubject(subject: string): Teacher[] {
    return Array.from(this.teacherMap.values())
      .filter(teacher => 
        teacher.subjects.some(s => s.subject === subject)
      );
  }
}