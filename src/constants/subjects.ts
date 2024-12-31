export const SUBJECT_CATEGORIES = {
  // Previous categories remain unchanged...

  // A-Level combinations
  ALEVEL_COMBINATIONS: {
    ARTS: {
      COMBO1: ['History', 'Economics', 'Geography'],
      COMBO2: ['History', 'Art', 'Geography'],
      COMBO3: ['Economics', 'Geography', 'Literature']
    },
    SCIENCES: {
      COMBO1: ['Physics', 'Chemistry', 'Biology'],
      COMBO2: ['Physics', 'Chemistry', 'Mathematics'],
      COMBO3: ['Biology', 'Chemistry', 'Mathematics']
    }
  },

  // Subjects that must be scheduled simultaneously in A-Level
  ALEVEL_SIMULTANEOUS: {
    GROUP1: ['Geography', 'Islam', 'Divinity'],
    GROUP2: ['History', 'Art'],
    GROUP3: ['Economics', 'Luganda', 'Arabic', 'Kiswahili', 'Literature'],
    GROUP4: ['ICT', 'SubMath'],
    GROUP5: ['Biology', 'Physics'],
    GROUP6: ['Mathematics', 'Agriculture']
  }
};

// Rules for simultaneous scheduling
export const SIMULTANEOUS_RULES = {
  // Previous rules remain...

  // A-Level specific rules
  ALEVEL: {
    // Maximum subjects that can be scheduled simultaneously for each group
    MAX_SIMULTANEOUS: {
      GROUP1: 3, // Geography, Islam, Divinity
      GROUP2: 2, // History, Art
      GROUP3: 5, // Economics, Luganda, Arabic, Kiswahili, Literature
      GROUP4: 2, // ICT, SubMath
      GROUP5: 2, // Biology, Physics
      GROUP6: 2  // Mathematics, Agriculture
    },

    // Periods when simultaneous subjects should be scheduled
    PREFERRED_PERIODS: {
      SCIENCES: [1, 2, 3], // Morning periods for sciences
      ARTS: [4, 5, 6]      // Afternoon periods for arts
    }
  }
};