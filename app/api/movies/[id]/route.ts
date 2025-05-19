import { NextRequest, NextResponse } from "next/server";
import { fetchFromApi } from "@/utils/apiClient";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // In Next.js 15, params is an actual Promise that needs to be awaited
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Movie ID is required" },
      { status: 400 }
    );
  }

  try {
    // Detect if it's a TV show or movie based on the stored media type
    // For simplicity, we'll try movie first, then TV if that fails
    try {
      const movieData = await fetchFromApi(`/3/movie/${id}?append_to_response=videos&language=en-US`);
      return NextResponse.json(movieData);
    } catch {
      const tvData = await fetchFromApi(`/3/tv/${id}?append_to_response=videos&language=en-US`);
      return NextResponse.json(tvData);
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch movie details" },
      { status: 500 }
    );
  }
}
