import mongoose from "mongoose";

const buildDirectUri = (srvUri) => {
  const hosts = process.env.MONGO_DIRECT_HOSTS?.trim();
  if (!hosts || !srvUri.startsWith("mongodb+srv://")) return null;

  const srvUrl = new URL(srvUri);
  const credentials = srvUrl.password
    ? `${srvUrl.username}:${srvUrl.password}`
    : srvUrl.username;
  const options = new URLSearchParams(srvUrl.search);

  options.set("tls", "true");
  options.set("authSource", options.get("authSource") || "admin");

  const replicaSet = process.env.MONGO_REPLICA_SET?.trim();
  if (replicaSet) options.set("replicaSet", replicaSet);

  return `mongodb://${credentials}@${hosts}${srvUrl.pathname || "/"}?${options}`;
};

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI?.trim();

  if (!mongoUri) {
    throw new Error("MONGO_URI is not configured. Add it to backend/.env.");
  }

  mongoose.set("bufferCommands", false);
  const connectionUri = process.env.MONGO_DIRECT_URI?.trim() || buildDirectUri(mongoUri) || mongoUri;
  await mongoose.connect(connectionUri, { serverSelectionTimeoutMS: 10000 });
  console.log("MongoDB connected");
};

export default connectDB;
