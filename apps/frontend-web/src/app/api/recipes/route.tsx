import { NextRequest, NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/getBackendUrl";

const backendUrl = getBackendUrl();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ingredients = searchParams.get("ingredients");
    const restrictions = searchParams.get("restrictions");

    const backendUrl = process.env.BACKEND_API_URL;
    if (!backendUrl) {
      throw new Error(
        "BACKEND_API_URL is not defined in environment variables"
      );
    }

    // Build backend request URL with query parameters
    const queryParams = new URLSearchParams();
    if (ingredients) queryParams.append("ingredients", ingredients);
    if (restrictions) queryParams.append("restrictions", restrictions);

    const fullUrl = `${backendUrl}/api/recipes?${queryParams.toString()}`;

    const backendResponse = await fetch(fullUrl);
    const data = await backendResponse.json();

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const recipeData = await request.json();

    const response = await fetch(`${backendUrl}/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error forwarding recipe to backend:", error);
    return NextResponse.json(
      { error: "Failed to add recipe" },
      { status: 500 }
    );
  }
}
