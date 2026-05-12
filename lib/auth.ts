import { cookies } from "next/headers";
import crypto from "crypto";

// Session storage (in production, use Redis or a database)
const SESSION_STORE = new Map<string, { userId: string; createdAt: number }>();
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const SESSION_COOKIE_NAME = "admin_session_id";

/**
 * Generate a secure session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Create a new admin session
 */
export function createAdminSession(): string {
  const token = generateSessionToken();
  SESSION_STORE.set(token, {
    userId: "admin",
    createdAt: Date.now(),
  });

  // Clean up old sessions
  cleanupOldSessions();

  return token;
}

/**
 * Verify admin session token
 */
export function verifyAdminSession(token: string): boolean {
  const session = SESSION_STORE.get(token);

  if (!session) {
    return false;
  }

  // Check if session has expired
  if (Date.now() - session.createdAt > SESSION_DURATION) {
    SESSION_STORE.delete(token);
    return false;
  }

  // Refresh session timestamp
  session.createdAt = Date.now();
  return true;
}

/**
 * Invalidate session
 */
export function invalidateSession(token: string): void {
  SESSION_STORE.delete(token);
}

/**
 * Get session from cookies
 */
export async function getSessionFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true, // Not accessible from JavaScript
    secure: process.env.NODE_ENV === "production", // Only sent over HTTPS in production
    sameSite: "strict", // CSRF protection
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: "/",
  });
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Verify admin credentials
 */
export function verifyAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL || "";
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  return (
    email.trim().toLowerCase() === adminEmail.toLowerCase() &&
    password === adminPassword
  );
}

/**
 * Clean up old sessions
 */
function cleanupOldSessions(): void {
  const now = Date.now();
  for (const [token, session] of SESSION_STORE.entries()) {
    if (now - session.createdAt > SESSION_DURATION) {
      SESSION_STORE.delete(token);
    }
  }
}

/**
 * Check if user is authenticated (server-side)
 */
export async function isAuthenticatedServer(): Promise<boolean> {
  const token = await getSessionFromCookies();
  if (!token) return false;
  return verifyAdminSession(token);
}
