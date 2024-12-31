class RateLimiter {
  private attempts: Map<string, { count: number; firstAttempt: number }> = new Map();
  private readonly MAX_ATTEMPTS = 5;
  private readonly WINDOW_MS = 15 * 60 * 1000; // 15 minutes

  increment(identifier: string): void {
    const now = Date.now();
    const entry = this.attempts.get(identifier);

    if (!entry) {
      this.attempts.set(identifier, { count: 1, firstAttempt: now });
      return;
    }

    if (now - entry.firstAttempt > this.WINDOW_MS) {
      this.attempts.set(identifier, { count: 1, firstAttempt: now });
    } else {
      this.attempts.set(identifier, {
        count: entry.count + 1,
        firstAttempt: entry.firstAttempt
      });
    }
  }

  isRateLimited(identifier: string): boolean {
    const entry = this.attempts.get(identifier);
    if (!entry) return false;

    const now = Date.now();
    if (now - entry.firstAttempt > this.WINDOW_MS) {
      this.attempts.delete(identifier);
      return false;
    }

    return entry.count >= this.MAX_ATTEMPTS;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const rateLimiter = new RateLimiter();