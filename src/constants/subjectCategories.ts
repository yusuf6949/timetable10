// Subject categorization for S3/S4
export const S3_S4_SUBJECTS = {
  COMPULSORY: [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History',
    'Geography'
  ],
  
  OPTIONAL: {
    GROUP_A: ['Literature', 'Kiswahili', 'French'],
    GROUP_B: ['Computer Studies', 'Commerce', 'Agriculture'],
    GROUP_C: ['Art', 'Music', 'Technical Drawing'],
    GROUP_D: ['Islam', 'CRE']  // Religious subjects
  },

  // Minimum periods per week
  PERIODS_PER_WEEK: {
    COMPULSORY: 6,  // Core subjects need more periods
    OPTIONAL: 3     // Optional subjects have fewer periods
  }
};