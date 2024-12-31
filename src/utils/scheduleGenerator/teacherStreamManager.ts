import { Teacher } from '../../types';
import { StreamDistributionManager } from './streamDistribution';

export class TeacherStreamManager {
  private streamManager: StreamDistributionManager;

  constructor() {
    this.streamManager = new StreamDistributionManager();
  }

  selectBestStreamForTeacher(
    teacher: Teacher,
    classLevel: string,
    availableStreams: string[]
  ): string | null {
    if (!availableStreams.length) return null;

    // For S3, use stream distribution logic
    if (classLevel === 'S3') {
      const preferredStream = this.streamManager.getPreferredStream(classLevel);
      if (availableStreams.includes(preferredStream)) {
        this.streamManager.recordAssignment(preferredStream);
        return preferredStream;
      }
    }

    // For other classes or if preferred stream unavailable
    return availableStreams[0];
  }

  getStreamWorkload(stream: string): number {
    return this.streamManager.getStreamWorkload(stream);
  }

  isStreamDistributionBalanced(): boolean {
    return this.streamManager.isBalanced();
  }
}