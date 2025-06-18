import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://juelsonjunior27:YVXFBWkxn5r4tr3r@basketdata.rc2juvg.mongodb.net/basketData?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error('Por favor, defina a variável de ambiente MONGODB_URI');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Conectado ao MongoDB Atlas');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Erro ao conectar ao MongoDB:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB; 