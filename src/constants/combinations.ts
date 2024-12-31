// A-Level subject combinations
export const ALEVEL_COMBINATIONS = {
  SCIENCES: {
    // Biology combinations
    BCM: ['Biology', 'Chemistry', 'Mathematics'],
    PCB: ['Physics', 'Chemistry', 'Biology'],
    PCM: ['Physics', 'Chemistry', 'Mathematics'],
    
    // Physics combinations
    PAM: ['Physics', 'Art', 'Mathematics'],
    PEM: ['Physics', 'Economics', 'Mathematics'],
    PEntM: ['Physics', 'Entrepreneurship', 'Mathematics']
  },
  
  ARTS: {
    // History combinations
    HIA: ['History', 'Islam', 'Art'],
    HEA: ['History', 'Economics', 'Art'],
    HED: ['History', 'Economics', 'Divinity'],
    HEI: ['History', 'Economics', 'Islam'],
    HEG: ['History', 'Economics', 'Geography'],
    HEEnt: ['History', 'Economics', 'Entrepreneurship'],
    HAraG: ['History', 'Arabic', 'Geography'],
    HAG: ['History', 'Art', 'Geography'],
    
    // Geography combinations
    GEA: ['Geography', 'Economics', 'Art'],
    GEEnt: ['Geography', 'Economics', 'Entrepreneurship'],
    GEI: ['Geography', 'Economics', 'Islam'],
    GED: ['Geography', 'Economics', 'Divinity'],
    GEAra: ['Geography', 'Economics', 'Arabic'],
    GEntD: ['Geography', 'Entrepreneurship', 'Divinity'],
    GEntI: ['Geography', 'Entrepreneurship', 'Islam'],
    
    // Economics combinations
    AEEnt: ['Art', 'Economics', 'Entrepreneurship']
  }
};

// Subjects that must be scheduled simultaneously
export const SIMULTANEOUS_SUBJECTS = {
  GROUP1: ['Geography', 'Islam', 'Divinity'],
  GROUP2: ['History', 'Art'],
  GROUP3: ['Economics', 'Luganda', 'Arabic', 'Kiswahili', 'Literature'],
  GROUP4: ['ICT', 'SubMath'],
  GROUP5: ['Biology', 'Physics'],
  GROUP6: ['Mathematics', 'Agriculture']
};