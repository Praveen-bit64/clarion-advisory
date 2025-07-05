import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  const { propertySchema } = req.body;

  const propertyType = JSON.stringify(propertySchema.propertyType);
  const cities = JSON.stringify(propertySchema.cities);
  const states = JSON.stringify(propertySchema.states);
  const countries = JSON.stringify(propertySchema.countries);
  const bedroomSizes = JSON.stringify(propertySchema.bedroomSizes); 
  const bathrooms = JSON.stringify(propertySchema.bathrooms);
  const tags = JSON.stringify(propertySchema.tags);

  try {
   await db.execute(
  `UPDATE propertyschemas 
   SET propertyType = ?, cities = ?, states = ?, countries = ?, bedroomSizes = ?, bathrooms = ?, tags = ? 
   WHERE id = 1`,
  [propertyType, cities, states, countries, bedroomSizes, bathrooms, tags] 
)
    return res.status(200).json({ error: false, message: "Property Schema updated" });
  } catch (err) {
    console.error("Error updating property schema", err);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}
