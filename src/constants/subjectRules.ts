// Subject classification and rules
export const SUBJECT_RULES = {
  COMPULSORY: {
    OLEVEL: ['Mathematics', 'English', 'Geography', 'History'],
    ALEVEL: ['General Paper']
  },
  
  STREAMS: {
    OLEVEL: ['A', 'B', 'C'],
    ALEVEL: ['A', 'B'] // Arts and Sciences
  },

  // Minimum periods per week for different subject types
  PERIODS_PER_WEEK: {
    OLEVEL: {
      COMPULSORY: 5,
      OPTIONAL: 2
    },
    ALEVEL: {
      COMPULSORY: 3,
      MAIN: 8 // For chosen subjects
    }
  }
};

// Helper functions to check subject requirements
export const isCompulsory = (subject: string, classLevel: string): boolean => {
  const isOLevel = ['S1', 'S2', 'S3', 'S4'].includes(classLevel);
  const compulsoryList = isOLevel 
    ? SUBJECT_RULES.COMPULSORY.OLEVEL 
    : SUBJECT_RULES.COMPULSORY.ALEVEL;
  
  return compulsoryList.includes(subject);
};