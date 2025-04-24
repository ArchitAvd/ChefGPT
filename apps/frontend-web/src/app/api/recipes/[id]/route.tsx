import { NextRequest, NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/getBackendUrl";

const backendUrl = getBackendUrl();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing recipe ID" }, { status: 400 });
    }

    const res = await fetch(`${backendUrl}/api/recipes/${id}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Recipe not found" },
        { status: res.status }
      );
    }

    const recipe = await res.json();
    return NextResponse.json(recipe);
  } catch (error) {
    console.error("❌ Error fetching recipe from backend:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}
