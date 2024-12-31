import { CLASSES } from '../constants';

export const getStreamsForClass = (classLevel: string): string[] => {
  if (classLevel === 'S5' || classLevel === 'S6') {
    return ['A', 'B']; // Arts and Sciences streams
  }
  return ['A', 'B', 'C']; // Regular streams for other classes
};

export const isValidStreamForClass = (classLevel: string, stream: string): boolean => {
  const validStreams = getStreamsForClass(classLevel);
  return validStreams.includes(stream);
};

export const getOtherStreams = (classLevel: string, currentStream: string): string[] => {
  return getStreamsForClass(classLevel).filter(stream => stream !== currentStream);
};