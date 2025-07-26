import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  try {
    const { id } = req.body;

    // 🔒 Ensure 'id' is provided and is a number
    if (!id ) {
      return res.status(400).json({ error: true, message: "Invalid or missing ID" });
    }

    const [result]: any = await db.execute('DELETE FROM `reviews` WHERE id = ?', [id]);

    // ✅ Optionally check if row was actually deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: "Testimonial not found" });
    }

    return res.status(200).json({ error: false, message: "Testimonial deleted successfully" });

  } catch (err) {
    console.error("Error deleting testimonial:", err);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}
