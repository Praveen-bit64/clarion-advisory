import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'; // Ensure bcryptjs is installed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  try {
    const { resetEmail, confirmPass } = req.body;

    // Validation
    if (!resetEmail || !confirmPass) {
      return res.status(400).json({ error: true, message: "Email and new password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      return res.status(400).json({ error: true, message: "Invalid email format" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(confirmPass, 10);

    // Update the password
    const [result]: any = await db.execute(
      'UPDATE authentication SET Password = ? WHERE Email = ?',
      [hashedPassword, resetEmail]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: "No user found with that email" });
    }

    return res.status(200).json({ error: false, message: "Password reset successful" });

  } catch (err: any) {
    console.error("Error updating password:", err);
    return res.status(500).json({ error: true, message: "Internal Server Error", detail: err.message });
  }
}
