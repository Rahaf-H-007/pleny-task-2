import "dotenv/config";
import mongoose from "mongoose";
import process from "process";
import { transformBrands } from "./transform";
import { seedBrands } from "./seed";

async function main() {
  const uri = process.env.MONGO_URL!;
  await mongoose.connect(uri);
  console.log("DB connected");

  await transformBrands();
  await seedBrands();
}

main().catch(console.error);
