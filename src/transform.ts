import mongoose from "mongoose";
import { Brand } from "./updated-brands-schema";

const minYear = 1600;

export async function transformBrands() {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database connection failed");

  const raw = await db.collection("brands").find({}).toArray();

  for (const doc of raw) {
    console.log(doc);
    // fix yearFounded issues
    let yearFounded =
      doc.yearFounded ?? doc.yearCreated ?? doc.yearsFounded ?? minYear;
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

    //fix headquarters issues
    let headquarters = doc.headquarters ?? "defaultLocation";

    //fix brandName
    let brandName = doc.brandName ?? doc.brand.name ?? "defaultBrandName";

    const rightDoc = {
      yearFounded,
      numberOfLocations,
      headquarters,
      brandName,
    };
    await Brand.findByIdAndUpdate(
      doc._id,
      {
        $set: rightDoc,
        $unset: { yearsFounded: "", yearCreated: "", hqAddress: "", brand: "" },
      },
      // $unset doesnt work or update database when strict is true
      { runValidators: true, strict: false },
    );
  }
}
