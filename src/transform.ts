import mongoose from "mongoose";
import { Brand } from "./updated-brands-schema";

const currentYear = new Date().getFullYear();
const minYear = 1600;

export async function transformBrands() {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database connection failed");

  const raw = await db.collection("brands").find({}).toArray();

  for (const doc of raw) {
    console.log(doc);
    // fix yearFounded issues
    let yearFounded = doc.yearCreated ?? doc.yearsFounded ?? minYear;
    yearFounded = Number(yearFounded);
    if (isNaN(yearFounded)) {
      yearFounded = minYear;
    }

    //fix numberOfLocarions issues
    let numberOfLocations = doc.numberOfLocations ?? 1;
    numberOfLocations = Number(numberOfLocations);
    if (isNaN(numberOfLocations)) {
      numberOfLocations = 1;
    }

    const rightDoc = { yearFounded, numberOfLocations };
    await Brand.findByIdAndUpdate(
      doc._id,
      {
        $set: rightDoc,
        $unset: { yearsFounded: "", yearCreated: "" },
      },
      // $unset doesnt work when strict is true
      { strict: false },
    );

    console.log("===============");
    console.log(`Transformed: ${doc._id}`);
    console.log(doc);
  }
}
