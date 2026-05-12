import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedServer } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await isAuthenticatedServer();

    if (!isAuthenticated) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { authenticated: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Auth verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
