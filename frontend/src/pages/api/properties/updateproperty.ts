import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  try {
    const { id, title, propertyPrice, propertyStatus,featureTag } = req.body;

    if (!id) {
      return res.status(400).json({ error: true, message: "Property ID is missing" });
    }

    await db.execute(
      'UPDATE listedproperties SET title = ?, propertyPrice = ?, propertyStatus = ?, featureTag=? WHERE id = ?',
      [title, propertyPrice, propertyStatus, featureTag, id]
    );

    return res.status(200).json({ error: false, message: 'Property updated successfully' });
  } catch (err) {
    console.error("Error updating property details:", err);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}
