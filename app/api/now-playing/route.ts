import { NextResponse  } from "next/server";
import { fetchFromApi } from "@/utils/apiClient";

export async function GET() {
    try {
        const data = await fetchFromApi("/3/movie/now_playing?language=en-US&page=1");
        console.log(data);
        return NextResponse.json(data);
        
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}