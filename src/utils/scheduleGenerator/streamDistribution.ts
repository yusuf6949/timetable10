import { Teacher } from '../../types';

export class StreamDistributionManager {
  private streamWorkloads: Map<string, Map<string, number>> = new Map();

  constructor() {
    // Initialize workload counters for each class level and stream
    ['S1', 'S2', 'S3', 'S4'].forEach(level => {
      const streamLoads = new Map();
      ['A', 'B', 'C'].forEach(stream => {
        streamLoads.set(stream, 0);
      });
      this.streamWorkloads.set(level, streamLoads);
    });
  }

  getPreferredStream(classLevel: string): string {
    const streamLoads = this.streamWorkloads.get(classLevel);
    if (!streamLoads) return 'A';

    // Get current workloads for this class level
    const workloads = Array.from(streamLoads.entries());
    
    // Sort streams by workload (ascending)
    workloads.sort(([, a], [, b]) => a - b);
    
    // Return stream with lowest workload
    return workloads[0][0];
  }

  recordAssignment(classLevel: string, stream: string): void {
    const streamLoads = this.streamWorkloads.get(classLevel);
    if (!streamLoads) return;

    const currentLoad = streamLoads.get(stream) || 0;
    streamLoads.set(stream, currentLoad + 1);
  }

  getStreamWorkload(classLevel: string, stream: string): number {
    return this.streamWorkloads.get(classLevel)?.get(stream) || 0;
  }

  isBalanced(classLevel: string): boolean {
    const streamLoads = this.streamWorkloads.get(classLevel);
    if (!streamLoads) return true;

    const loads = Array.from(streamLoads.values());
    const max = Math.max(...loads);
    const min = Math.min(...loads);
    
    // Maximum allowed difference between streams
    const maxDifference = 1; // Stricter balance requirement
    return max - min <= maxDifference;
  }

  getStreamDistribution(classLevel: string): Record<string, number> {
    const distribution: Record<string, number> = {};
    const streamLoads = this.streamWorkloads.get(classLevel);
    
    if (streamLoads) {
      streamLoads.forEach((load, stream) => {
        distribution[stream] = load;
      });
    }
    
    return distribution;
  }
}