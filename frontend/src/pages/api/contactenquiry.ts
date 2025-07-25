import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const resend = new Resend(process.env.RESEND_API_KEY)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  try {
    const {to, Data } = req.body;
    const {  fName='',
        lName='',
        phone='',
        email='',
        company='',
        message='' } = Data;
 if (!to) {
      return res.status(400).json({ error: 'Recipient email missing' });
    }
    await db.execute(
      'INSERT INTO contactEnquiry (firstName,lastName,phone,email,company,message) values (?,?,?,?,?,?)',
      [fName, lName, phone, email,company,message]
    );

    const data = await resend.emails.send({
        from:'Acme <onboarding@resend.dev>',
        to:[to],
         subject: `Contact Enquiry from: ${fName}`,
      html: `
        <h2>Contact Enquiry Received</h2>
        <p><strong>First Name:</strong> ${fName}</p>
        ${lName ? `<p><strong>Last Name:</strong> ${lName}</p>` : ''}
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>`:''}
        <p><strong>Message:</strong> ${message}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      `,
    })

    return res.status(200).json({ error: false, message: 'Form submitted',data });
  } catch (err) {
    console.error("Error sending contact form:", err);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}
