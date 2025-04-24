import { NextRequest, NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/getBackendUrl";

const backendUrl = getBackendUrl();

export async function GET(request: NextRequest) {
  try {
    const fullUrl = `${backendUrl}/api/recipes/random`;

    const backendResponse = await fetch(fullUrl);
    const data = await backendResponse.json();

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    return NextResponse.json(
      { error: "Failed to fetch random recipe" },
      { status: 500 }
    );
  }
}
