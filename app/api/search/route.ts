import { NextResponse } from "next/server";
import { fetchFromApi } from "@/utils/apiClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const data = await fetchFromApi(
      `/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`
    );
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to search movies" },
      { status: 500 }
    );
  }
}
