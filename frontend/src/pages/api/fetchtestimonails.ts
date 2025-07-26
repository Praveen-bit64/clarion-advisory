import { db } from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Fix: Use "GET" in uppercase
  if (req.method !== 'GET') {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  try {
    const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM reviews');
    return res.status(200).json({ error: false, message: "Testimonials fetched", testimonails: rows });
  } catch (err) {
    console.error('Error fetching Testimonials:', err);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}
