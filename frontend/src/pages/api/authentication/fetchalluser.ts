import { db } from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  try {
    const [rows] = await db.execute<RowDataPacket[]>('SELECT id, Name, City, Email, Phone, Profile, role, JoinedAt FROM authentication');

    if (rows.length > 0) {
      return res.status(200).json({
        error: false,
        message: "User details fetched successfully",
        users: rows
      });
    } else {
      return res.status(404).json({ error: true, message: "No users found" });
    }
  } catch (err: any) {
    console.error("Error fetching users:", err);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      detail: err.message
    });
  }
}
