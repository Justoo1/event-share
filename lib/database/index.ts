import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null};

export const connectToDatabase = async () => {
    if(cached.conn) return cached.conn;

    // Check if mongodb uri is present, if not throw error
    if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'eventShare',
        bufferCommands: false,
    })

    cached.conn = await cached.promise;

    return cached.conn;
}