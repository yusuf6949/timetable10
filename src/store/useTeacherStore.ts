import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Teacher, Subject, ClassDayAssignment } from '../types';

interface TeacherStore {
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id' | 'periodsAssigned'>) => void;
  removeTeacher: (index: number) => void;
  updateTeacherPeriods: (teachers: Teacher[]) => void;
  clearTeachers: () => void;
}

const useTeacherStore = create<TeacherStore>()(
  persist(
    (set) => ({
      teachers: [],
  
      addTeacher: (teacher) => set((state) => {
    // Check if teacher already exists
    const existingTeacherIndex = state.teachers.findIndex(
      t => t.name.toLowerCase() === teacher.name.toLowerCase()
    );

    if (existingTeacherIndex >= 0) {
      // Update existing teacher's subjects and days
      const updatedTeachers = [...state.teachers];
      const existingTeacher = updatedTeachers[existingTeacherIndex];

      // Merge subjects
      const mergedSubjects = [...existingTeacher.subjects];
      teacher.subjects.forEach(newSubject => {
        const existingSubjectIndex = mergedSubjects.findIndex(
          s => s.subject === newSubject.subject
        );

        if (existingSubjectIndex >= 0) {
          // Merge classes and streams for existing subject
          mergedSubjects[existingSubjectIndex] = {
            ...mergedSubjects[existingSubjectIndex],
            classes: [...new Set([...mergedSubjects[existingSubjectIndex].classes, ...newSubject.classes])],
            streams: [...new Set([...mergedSubjects[existingSubjectIndex].streams, ...newSubject.streams])]
          };
        } else {
          // Add new subject
          mergedSubjects.push(newSubject);
        }
      });

      // Update class-day assignments
      const mergedClassDayAssignments = [...existingTeacher.classDayAssignments];
      teacher.classDayAssignments.forEach(newAssignment => {
        const existingAssignmentIndex = mergedClassDayAssignments.findIndex(
          a => a.class === newAssignment.class
        );

        if (existingAssignmentIndex >= 0) {
          mergedClassDayAssignments[existingAssignmentIndex] = {
            ...mergedClassDayAssignments[existingAssignmentIndex],
            days: [...new Set([...mergedClassDayAssignments[existingAssignmentIndex].days, ...newAssignment.days])]
          };
        } else {
          mergedClassDayAssignments.push(newAssignment);
        }
      });

      updatedTeachers[existingTeacherIndex] = {
        ...existingTeacher,
        subjects: mergedSubjects,
        classDayAssignments: mergedClassDayAssignments,
        availableDays: [...new Set([...existingTeacher.availableDays, ...teacher.availableDays])],
        aLevelOnly: existingTeacher.aLevelOnly || teacher.aLevelOnly
      };

      return { teachers: updatedTeachers };
    }

    // Add new teacher
    return {
      teachers: [...state.teachers, {
        ...teacher,
        id: state.teachers.length + 1,
        periodsAssigned: 0,
        classDayAssignments: teacher.classDayAssignments || []
      }]
    };
  }),
  
      removeTeacher: (index) => set((state) => ({
        teachers: state.teachers.filter((_, i) => i !== index)
      })),
  
      updateTeacherPeriods: (updatedTeachers) => set({
        teachers: updatedTeachers
      }),
  
      clearTeachers: () => set({ teachers: [] })
    }),
    {
      name: 'teacher-storage',
      partialize: (state) => ({ teachers: state.teachers })
    }
  )
);

export default useTeacherStore;