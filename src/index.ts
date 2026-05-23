import "dotenv/config";
import mongoose from "mongoose";
import process from "process";
import { transformBrands } from "./transform";

async function main() {
  const uri = process.env.MONGO_URL!;
  await mongoose.connect(uri);
  console.log("DB connected");

  await transformBrands();
}

main().catch(console.error);
