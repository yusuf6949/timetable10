import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Subject } from '../types';
import useTeacherStore from '../store/useTeacherStore';
import SubjectSelect from './form/SubjectSelect';
import DaySelector from './form/DaySelector';

const TeacherForm: React.FC = () => {
  const addTeacher = useTeacherStore((state) => state.addTeacher);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subjects: [{ subject: '', classes: [], streams: [] }] as Subject[],
    aLevelOnly: false
  });

  const handleSubjectChange = (index: number, field: keyof Subject, value: string | string[]) => {
    const updatedSubjects = [...newTeacher.subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [field]: value,
    };
    setNewTeacher({ ...newTeacher, subjects: updatedSubjects });
  };

  const addSubject = () => {
    setNewTeacher({
      ...newTeacher,
      subjects: [...newTeacher.subjects, { subject: '', classes: [], streams: [] }],
    });
  };

  const removeSubject = (index: number) => {
    const updatedSubjects = newTeacher.subjects.filter((_, i) => i !== index);
    setNewTeacher({ ...newTeacher, subjects: updatedSubjects });
  };

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = () => {
    if (newTeacher.name && selectedDays.length > 0) {
      addTeacher({
        name: newTeacher.name,
        subjects: newTeacher.subjects,
        availableDays: selectedDays,
        aLevelOnly: newTeacher.aLevelOnly
      });
      
      // Reset form
      setNewTeacher({
        name: '',
        subjects: [{ subject: '', classes: [], streams: [] }],
        aLevelOnly: false
      });
      setSelectedDays([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
            Teacher Name
          </label>
          <input
            type="text"
            placeholder="Enter teacher's name"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            className="w-full px-4 py-2 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-primary-light text-light-text dark:text-dark-text placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="aLevelOnly"
          checked={newTeacher.aLevelOnly}
          onChange={(e) => setNewTeacher({ ...newTeacher, aLevelOnly: e.target.checked })}
          className="h-4 w-4 text-primary dark:text-primary-light focus:ring-primary dark:focus:ring-primary-light border-light-border dark:border-dark-border rounded"
        />
        <label htmlFor="aLevelOnly" className="ml-2 block text-sm text-light-text dark:text-dark-text">
          A-Level Only Teacher (S5 and S6 only)
        </label>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-light-text dark:text-dark-text">
            Subjects & Classes
          </h3>
          <button
            onClick={addSubject}
            aria-label="Add another subject"
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-md hover:bg-primary/20 dark:hover:bg-primary-light/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Subject
          </button>
        </div>

        {newTeacher.subjects.map((subject, index) => (
          <SubjectSelect
            key={index}
            subject={subject}
            onChange={(field, value) => handleSubjectChange(index, field, value)}
            onRemove={() => removeSubject(index)}
          />
        ))}
      </div>

      <DaySelector
        selectedDays={selectedDays}
        onDayToggle={handleDayToggle}
      />

      <button
        onClick={handleSubmit}
        disabled={!newTeacher.name || selectedDays.length === 0}
        aria-label={!newTeacher.name ? "Enter teacher name to continue" : selectedDays.length === 0 ? "Select available days to continue" : "Add teacher"}
        className="w-full px-4 py-3 bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Add Teacher
      </button>
    </div>
  );
};

export default TeacherForm;