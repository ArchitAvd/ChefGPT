import { NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/getBackendUrl";

const backendUrl = getBackendUrl();

export async function GET(req: Request) {
  try {
    const { search } = new URL(req.url); // Extract ?ingredients=...&dietary=...
    const backendResponse = await fetch(
      `${backendUrl}/api/ai/generate${search}`
    );
    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Health check proxy failed:", error);
    return NextResponse.json(
      { status: "error", error: "Unable to reach backend" },
      { status: 500 }
    );
  }
}
