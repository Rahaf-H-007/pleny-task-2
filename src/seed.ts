import { faker } from "@faker-js/faker";
import Brand from "./brands-schema";

const minYear = 1600;
const currentYear = new Date().getFullYear();

export async function seedBrands() {
  const data = [
    // minimum year
    {
      brandName: faker.company.name(),
      yearFounded: minYear,
      headquarters: faker.location.city(),
      numberOfLocations: 50,
    },

    // so many locations
    {
      brandName: faker.company.name(),
      yearFounded: 1995,
      headquarters: faker.location.city(),
      numberOfLocations: 5000,
    },

    // one location
    {
      brandName: faker.company.name(),
      yearFounded: 2015,
      headquarters: faker.location.city(),
      numberOfLocations: 1,
    },

    // founded this year
    {
      brandName: faker.company.name(),
      yearFounded: currentYear,
      headquarters: faker.location.city(),
      numberOfLocations: 3,
    },

    // brand from long time ago
    {
      brandName: faker.company.name(),
      yearFounded: 1620,
      headquarters: faker.location.city(),
      numberOfLocations: 200,
    },

    // long brand name
    {
      brandName:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
      yearFounded: 2001,
      headquarters: faker.location.city(),
      numberOfLocations: 40,
    },

    // special characters in brand name
    {
      brandName: "lorem & impsum's restaurant",
      yearFounded: 1988,
      headquarters: faker.location.city(),
      numberOfLocations: 150,
    },

    // restaurants all around the world
    {
      brandName: faker.company.name(),
      yearFounded: 1970,
      headquarters: "New York, USA",
      numberOfLocations: 99999,
    },

    // headquarters with non english characters
    {
      brandName: faker.company.name(),
      yearFounded: 1999,
      headquarters: "São Paulo, Brazil",
      numberOfLocations: 120,
    },

    // numbers and letters in brand name
    {
      brandName: "54x restaurant",
      yearFounded: 2010,
      headquarters: faker.location.city(),
      numberOfLocations: 85,
    },
  ];

  for (let i = 0; i < data.length; i++) {
    const brand = new Brand(data[i]);
    await brand.save();
  }
}
