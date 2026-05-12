import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, getSessionFromCookies, invalidateSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Get current session from cookies
    const token = await getSessionFromCookies();

    // Invalidate the session
    if (token) {
      invalidateSession(token);
    }

    // Clear the session cookie
    await clearSessionCookie();

    return NextResponse.json(
      { success: true, message: "Logout successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
