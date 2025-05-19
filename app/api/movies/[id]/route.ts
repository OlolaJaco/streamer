import { NextRequest, NextResponse } from "next/server";
import { fetchFromApi } from "@/utils/apiClient";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

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
      const movieData = await fetchFromApi(`/3/movie/${id}?language=en-US`);
      return NextResponse.json(movieData);
    } catch {
      const tvData = await fetchFromApi(`/3/tv/${id}?language=en-US`);
      return NextResponse.json(tvData);
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch movie details" },
      { status: 500 }
    );
  }
}
