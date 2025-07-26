import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: true, message: "Method Not Allowed" });

  try {
    const [rows] = await db.execute("SELECT * FROM contactenquiry");
    return res.status(200).json({ error: false, data: rows });
  } catch (err) {
    return res.status(500).json({ error: true, message: "Failed to fetch contact enquiries" });
  }
}
