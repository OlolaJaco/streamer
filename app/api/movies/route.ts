import { NextResponse } from "next/server";
import { fetchFromApi } from "@/utils/apiClient";

export async function GET() {
  try {
    const data = await fetchFromApi("/3/trending/all/day?language=en-US");
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}