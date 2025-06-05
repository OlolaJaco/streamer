import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectToDatabase()
        console.log("Connected to MongoDB successfully");
        return NextResponse.json({ success: true, message: "Connected to MongoDB" });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        return NextResponse.json({ success: false, message: "Failed to connect to MongoDB" }, { status: 500 });
    }
}