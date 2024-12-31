import React from 'react';
import { DAYS, CLASSES } from '../../constants';
import { ClassDayAssignment } from '../../types';

interface ClassDaySelectorProps {
  assignments: ClassDayAssignment[];
  onAssignmentChange: (assignments: ClassDayAssignment[]) => void;
  selectedClasses: string[];
}

const ClassDaySelector: React.FC<ClassDaySelectorProps> = ({
  assignments,
  onAssignmentChange,
  selectedClasses
}) => {
  const handleDayToggle = (className: string, day: string) => {
    const updatedAssignments = [...assignments];
    const assignmentIndex = updatedAssignments.findIndex(a => a.class === className);

    if (assignmentIndex >= 0) {
      const assignment = updatedAssignments[assignmentIndex];
      if (assignment.days.includes(day)) {
        assignment.days = assignment.days.filter(d => d !== day);
      } else {
        assignment.days = [...assignment.days, day];
      }
    } else {
      updatedAssignments.push({ class: className, days: [day] });
    }

    onAssignmentChange(updatedAssignments);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Class-Specific Days</h3>
      {selectedClasses.map(className => (
        <div key={className} className="space-y-2">
          <div className="text-sm text-gray-600">{className}</div>
          <div className="flex gap-2 flex-wrap">
            {DAYS.map(day => {
              const assignment = assignments.find(a => a.class === className);
              const isSelected = assignment?.days.includes(day);

              return (
                <button
                  key={`${className}-${day}`}
                  onClick={() => handleDayToggle(className, day)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day.substring(0, 3)}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};