import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Here we would normally check connection to a database or other services
    // For demonstration purposes, we'll just return success
    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
