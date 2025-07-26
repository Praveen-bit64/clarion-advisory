import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  try {
    const { code, to } = req.body;

    // Basic validation
    if (!to || !code) {
      return res.status(400).json({ error: true, message: "Missing 'to' email or 'code'" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({ error: true, message: "Invalid email format" });
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Password Reset Code</h2>
        <p>Here is your reset code:</p>
        <p style="font-size: 18px; font-weight: bold; color: #2a9d8f;">${code}</p>
        <p>If you did not request a reset, please ignore this email.</p>
        <br />
        <p>Thanks,<br/>The Clarion Team</p>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [to],
      subject: 'Reset Your Password Code',
      html: htmlContent
    });

    if (emailResponse.error) {
      console.error("Email sending failed:", emailResponse.error);
      return res.status(500).json({ error: true, message: "Failed to send email", detail: emailResponse.error });
    }

    return res.status(200).json({ error: false, message: "Reset code sent", data: emailResponse });
  } catch (err: any) {
    console.error("Unexpected error while sending reset code:", err);
    return res.status(500).json({ error: true, message: "Internal Server Error", detail: err.message });
  }
}
