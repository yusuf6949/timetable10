import React from 'react';
import { X, BookOpen, Calendar } from 'lucide-react';
import useTeacherStore from '../store/useTeacherStore';

const TeacherList: React.FC = () => {
  const { teachers, removeTeacher } = useTeacherStore();

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Teachers ({teachers.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map((teacher, index) => (
          <div key={index} className="relative group">
            <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-200 transition-colors">
              <button
                onClick={() => removeTeacher(index)}
                className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-semibold text-gray-900 mb-3">{teacher.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 mt-0.5 text-indigo-500" />
                  <div>
                    <p className="font-medium text-gray-700">Subjects:</p>
                    <p>{teacher.subjects.map(s => s.subject).join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-0.5 text-indigo-500" />
                  <div>
                    <p className="font-medium text-gray-700">Available:</p>
                    <p>{teacher.availableDays.join(', ')}</p>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-100">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {teacher.periodsAssigned} Periods Assigned
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;