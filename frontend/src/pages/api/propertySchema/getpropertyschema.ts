import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  try {
    const [rows]: any = await db.execute("SELECT * FROM propertySchemas LIMIT 1");

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: true, message: "No Data Found" });
    }

    const schemaRow = rows[0];

    // Parse individual JSON fields
    const propertySchema = {
      propertyType: JSON.parse(schemaRow.propertyType || "[]"),
      cities: JSON.parse(schemaRow.cities || "[]"),
      states: JSON.parse(schemaRow.states || "[]"),
      countries: JSON.parse(schemaRow.countries || "[]"),
      bedroomSizes: JSON.parse(schemaRow.bedroomSizes || "[]"),
      bathrooms: JSON.parse(schemaRow.bathrooms || "[]"),
      tags: JSON.parse(schemaRow.tags || "[]"),
      amenities: JSON.parse(schemaRow.amenities || "[]"),
    };

    return res.status(200).json({
      error: false,
      message: "Fetched propertySchemas",
      propertySchema,
    });
  } catch (err) {
    console.error("Error Fetching PropertySchemas:", err);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}
