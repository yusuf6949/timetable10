import React from 'react';
import { X, Save, Plus } from 'lucide-react';
import { SUBJECTS } from '../../constants';
import { Subject } from '../../types';

interface SubjectSelectProps {
  subject: Subject;
  onChange: (field: keyof Subject, value: string | string[]) => void;
  onRemove: () => void;
}

const SubjectSelect: React.FC<SubjectSelectProps> = ({ subject, onChange, onRemove }) => {
  const [selectedClass, setSelectedClass] = React.useState<string>('');
  
  const handleSaveClass = () => {
    if (selectedClass && !subject.classes.includes(selectedClass)) {
      onChange('classes', [...subject.classes, selectedClass]);
      setSelectedClass('');
    }
  };

  return (
    <div className="p-4 bg-light-hover dark:bg-dark-hover rounded-lg space-y-3 transition-colors">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <select
            value={subject.subject}
            onChange={(e) => onChange('subject', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-light text-light-text dark:text-dark-text transition-colors"
          >
            <option value="">Select Subject</option>
            {SUBJECTS.map(subj => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="flex-1 px-3 py-2 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-light text-light-text dark:text-dark-text transition-colors"
            >
              <option value="">Select Class</option>
              {['S1', 'S2', 'S3', 'S4', 'S5', 'S6']
                .filter(cls => !subject.classes.includes(cls))
                .map(className => (
                  <option key={className} value={className}>{className}</option>
              ))}
            </select>
            <button
              onClick={handleSaveClass}
              disabled={!selectedClass}
              className="p-2 text-primary dark:text-primary-light hover:bg-primary/10 dark:hover:bg-primary-light/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Save class"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
          
          {subject.classes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {subject.classes.map(cls => (
                <span
                  key={cls}
                  className="px-2 py-1 text-sm bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-md"
                >
                  {cls}
                </span>
              ))}
            </div>
          )}
        </div>

        {subject.classes.some(c => c === 'S5' || c === 'S6') && (
          <div className="flex-1">
            <select
              multiple
              value={subject.streams}
              onChange={(e) => onChange('streams',
                Array.from(e.target.selectedOptions, option => option.value)
              )}
              className="w-full px-3 py-2 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-light text-light-text dark:text-dark-text transition-colors"
            >
              <option value="A">Arts A</option>
              <option value="B">Sciences B</option>
            </select>
          </div>
        )}

        <button
          onClick={onRemove}
          className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SubjectSelect;