import React from 'react';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CLASSES, DAYS, TIME_PERIODS } from '../constants';
import useScheduleStore from '../store/useScheduleStore';

const Schedule: React.FC = () => {
  const { schedule, selectedClass, setSelectedClass } = useScheduleStore();

  const exportToPDF = () => {
    const doc = new jsPDF('landscape', 'mm', 'a4');
    doc.addImage('/school-icon.svg', 'SVG', 10, 10, 20, 20);
    
    doc.setProperties({
      title: `${selectedClass} - Weekly Schedule`,
      subject: 'School Timetable',
      author: 'Kinaawa High School',
      creator: 'KHSK TimeTable'
    });

    // School header
    doc.setFontSize(18);
    doc.setTextColor(26, 71, 42);
    doc.text('KINAAWA HIGH SCHOOL', 148, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('KAWEMPE CAMPUS', 148, 28, { align: 'center' });
    doc.text('"Learn to Excel"', 148, 35, { align: 'center' });

    // Schedule title
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Class ${selectedClass} - Weekly Schedule`, 15, 75);

    // Generate table data
    const tableData = TIME_PERIODS.map(period => {
      if (period.type === 'break') {
        return [period.time, ...Array(DAYS.length).fill(period.label)];
      }
      return [
        period.time,
        ...DAYS.map(day => {
          const slot = schedule[selectedClass]?.[day]?.[period.id];
          return slot ? `${slot.subject}\n(${slot.teacher})` : '';
        })
      ];
    });

    // Add table
    doc.autoTable({
      startY: 80,
      head: [['Time', ...DAYS]],
      body: tableData,
      theme: 'grid',
      styles: {
        cellPadding: 2,
        fontSize: 8,
        lineColor: [26, 71, 42],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [26, 71, 42],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 245, 240]
      }
    });

    doc.save(`${selectedClass}_schedule.pdf`);
  };

  if (!Object.keys(schedule).length) return null;

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-card dark:shadow-card-dark p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-school-green dark:text-white">
            Weekly Schedule
          </h2>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 bg-light-hover dark:bg-dark-hover border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text focus:ring-2 focus:ring-school-green"
          >
            {CLASSES.map(className => (
              <option key={className} value={className}>{className}</option>
            ))}
          </select>
        </div>
        <button
          onClick={exportToPDF}
          className="flex items-center gap-2 px-4 py-2 bg-school-green text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-light-border dark:border-dark-border bg-light-hover dark:bg-dark-hover p-2">
                Time
              </th>
              {DAYS.map(day => (
                <th key={day} className="border border-light-border dark:border-dark-border bg-light-hover dark:bg-dark-hover p-2">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_PERIODS.map(period => (
              <tr key={period.id} className={period.type === 'break' ? 'bg-gray-50 dark:bg-gray-800/50' : ''}>
                <td className="border border-light-border dark:border-dark-border p-2 text-sm">
                  {period.time}
                </td>
                {DAYS.map(day => (
                  <td key={day} className="border border-light-border dark:border-dark-border p-2">
                    {period.type === 'break' ? (
                      <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                        {period.label}
                      </div>
                    ) : schedule[selectedClass]?.[day]?.[period.id] ? (
                      <div className="space-y-1">
                        <div className="font-medium text-school-green dark:text-white">
                          {schedule[selectedClass][day][period.id].subject}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {schedule[selectedClass][day][period.id].teacher}
                        </div>
                      </div>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;