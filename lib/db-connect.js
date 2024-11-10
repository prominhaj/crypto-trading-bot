import mongoose from 'mongoose';

export async function dbConnect() {
    if (mongoose.connections[0].readyState) {
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        return conn;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}
