
// This Api route is where i keep testing my api

import { NextResponse } from "next/server";
import { fetchFromApi } from "@/utils/apiClient";

export async function GET() {
  try {
    // Test with movie ID 11 (Star Wars) and append videos
    const movieData = await fetchFromApi(`/3/movie/1399?append_to_response=season/1,season/2`);
    
    // Log the response to see the structure
    console.log('API Response with videos:', JSON.stringify(movieData, null, 2));
    
    // Check if videos exist in the response
    const hasVideos = movieData.videos && Array.isArray(movieData.videos.results) && movieData.videos.results.length > 0;
    
    return NextResponse.json({
      title: movieData.title,
      hasVideos: hasVideos,
      videosCount: hasVideos ? movieData.videos.results.length : 0,
      firstVideoKey: hasVideos ? movieData.videos.results[0].key : null,      fullResponse: movieData
    });  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error fetching movie with videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie details with videos", message: errorMessage },
      { status: 500 }
    );
  }
}
