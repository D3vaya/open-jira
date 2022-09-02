import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isconnected: 0,
};

export const connect = async () => {
  if (mongoConnection.isconnected) {
    console.log("Ya estabamos conectados");
    return;
  }
  if (mongoose.connections.length > 0) {
    mongoConnection.isconnected = mongoose.connections[0].readyState;
    if (mongoConnection.isconnected === 1) {
      console.log("usando conexión anteriro");
    }
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongoConnection.isconnected = 1;
  console.log(`conectado a mongoDB: ${process.env.MONGO_URL}`);
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return;
  if (mongoConnection.isconnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isconnected = 0;

  console.log("Desconectado de mongoDB");
};
