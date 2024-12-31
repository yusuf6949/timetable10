export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'History',
  'Geography',
  'P.E',
  'ICT',
  'ENT',
  'Arabic',
  'Kiswahili',
  'Luganda',
  'Literature',
  'ART',
  'Theology',
  'General Paper',
  'Economics',
  'SubMath',
  'Islam',
  'Divinity',
  'Agriculture',
  'CRE'
];

export const CLASSES = [
  ...['S1', 'S2'].flatMap(level => ['A', 'B', 'C'].map(stream => `${level}${stream}`)),
  ...['S3', 'S4'].flatMap(level => ['A', 'B', 'C'].map(stream => `${level}${stream}`)),
  ...['S5', 'S6'].flatMap(level => ['A', 'B'].map(stream => `${level}${stream}`))
];

export const TIME_PERIODS = [
  { id: 1, time: '7:20 AM - 8:40 AM', type: 'lesson' },
  { id: 2, time: '8:40 AM - 10:00 AM', type: 'lesson' },
  { id: 'break1', time: '10:00 AM - 10:20 AM', type: 'break', label: 'Break Time' },
  { id: 3, time: '10:20 AM - 11:40 AM', type: 'lesson' },
  { id: 4, time: '11:40 AM - 1:00 PM', type: 'lesson' },
  { id: 'lunch', time: '1:00 PM - 2:00 PM', type: 'break', label: 'Lunch Break' },
  { id: 5, time: '2:00 PM - 3:20 PM', type: 'lesson' },
  { id: 6, time: '3:20 PM - 4:40 PM', type: 'lesson' }
];

export const SUBJECT_CATEGORIES = {
  COMPULSORY: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography'],
  OPTIONAL: SUBJECTS.filter(subject => 
    !['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'General Paper', 'SubMath'].includes(subject)
  ),
  PE: ['P.E'],
  SCIENCE: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
  HISTORY: ['History', 'Geography']
};

export const SIMULTANEOUS_SUBJECTS = {
  'Islam': ['CRE'],
  'ENT': ['Luganda', 'Arabic', 'ICT', 'ART', 'Kiswahili']
};