import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/streamer';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        console.log('Connecting to MongoDB:', MONGODB_URI);
        
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).catch((error) => {
            console.error('MongoDB connection error:', error);
            cached.promise = null;
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
        console.log('MongoDB connected successfully');
        return cached.conn;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        cached.promise = null;
        throw error;
    }
}