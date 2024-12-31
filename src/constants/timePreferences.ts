// Time slots categorization
export const TIME_PREFERENCES = {
  MORNING_SLOTS: [1, 2], // 7:20 AM - 10:00 AM
  MIDDAY_SLOTS: [3, 4], // 10:20 AM - 1:00 PM
  AFTERNOON_SLOTS: [5, 6], // 2:00 PM - 4:40 PM
};

// Subject timing preferences
export const SUBJECT_TIME_PREFERENCES = {
  // Subjects that should be in morning slots (when students are most alert)
  MORNING_PREFERENCE: [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology'
  ],
  
  // Subjects better suited for midday
  MIDDAY_PREFERENCE: [
    'History',
    'Geography',
    'English',
    'Economics'
  ],
  
  // Subjects that work well in afternoon slots
  AFTERNOON_PREFERENCE: [
    'P.E',
    'Art',
    'Music',
    'Agriculture'
  ]
};