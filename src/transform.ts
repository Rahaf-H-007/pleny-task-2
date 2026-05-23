import mongoose from "mongoose";
import { Brand } from "./updated-brands-schema";

const currentYear = new Date().getFullYear();
const minYear = 1600;

export async function transformBrands() {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database connection not established");

  const raw = await db.collection("brands").find({}).toArray();

  console.log(raw);
}
