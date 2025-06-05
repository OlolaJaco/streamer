import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const { name, email, image } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      await User.create({
        name,
        email,
        image,
      });
      console.log('New user created:', email);
      return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } else {
      // Optionally update existing user data
      await User.findOneAndUpdate(
        { email },
        { name, image },
        { new: true }
      );
      console.log('Existing user updated:', email);
      return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
    }
  } catch (error) {
    console.error('Database sync error:', error);
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
  }
}
