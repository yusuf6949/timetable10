// Use Web Crypto API for generating random tokens
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

interface Session {
  token: string;
  userId: string;
  expiresAt: number;
}

class SessionManager {
  private sessions: Map<string, Session> = new Map();
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  private readonly CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes

  constructor() {
    // Cleanup expired sessions periodically
    setInterval(() => this.cleanupExpiredSessions(), this.CLEANUP_INTERVAL);
  }

  createSession(userId: string): Session {
    const token = generateToken();
    const expiresAt = Date.now() + this.SESSION_DURATION;
    const session = { token, userId, expiresAt };
    
    this.sessions.set(token, session);
    return session;
  }

  validateSession(token: string): Session | null {
    const session = this.sessions.get(token);
    if (!session || session.expiresAt < Date.now()) {
      this.sessions.delete(token);
      return null;
    }
    return session;
  }

  removeSession(token: string): void {
    this.sessions.delete(token);
  }

  private cleanupExpiredSessions(): void {
    const now = Date.now();
    for (const [token, session] of this.sessions.entries()) {
      if (session.expiresAt < now) {
        this.sessions.delete(token);
      }
    }
  }
}

export const sessionManager = new SessionManager();