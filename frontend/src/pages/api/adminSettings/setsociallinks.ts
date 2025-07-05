import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  const { socialLinks } = req.body;

  if (!socialLinks || typeof socialLinks !== "object") {
    return res.status(400).json({ error: true, message: "Invalid socialLinks data" });
  }

  try {
    await db.execute(
      "UPDATE adminSettings SET socialLinks = ? LIMIT 1",
      [JSON.stringify(socialLinks)]
    );

    return res.status(200).json({ error: false, message: "Social Links Updated" });
  } catch (err) {
    console.error("Error updating social links:", err);
    return res.status(500).json({ error: true, message: "Error updating social links" });
  }
}
