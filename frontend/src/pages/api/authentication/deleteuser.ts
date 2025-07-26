import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  try {
    const { id } = req.body;

    // Validation
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: true, message: "Invalid or missing user ID" });
    }

    const [result]: any = await db.execute('DELETE FROM authentication WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: "User not found or already deleted" });
    }

    return res.status(200).json({ error: false, message: "User deleted successfully" });

  } catch (err: any) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ error: true, message: "Internal Server Error", detail: err.message });
  }
}
