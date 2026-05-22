import "dotenv/config";
import mongoose from "mongoose";
import process from "process";

async function main() {
  const uri = process.env.MONGO_URL!;
  await mongoose.connect(uri);
  console.log("DB connected");
}

main().catch(console.error);
