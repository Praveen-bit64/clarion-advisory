// pages/api/send-enquiry.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, propertyTitle, propertyId, company, to } = req.body;

    if (!to) {
      return res.status(400).json({ error: 'Recipient email missing' });
    }

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [to],
      subject: `Enquiry for Property: ${propertyTitle}`,
      html: `
        <h2>Property Enquiry Received</h2>
        <p><strong>Property:</strong> ${propertyTitle} (ID: CLR-STE-${propertyId})</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Send email failed:', err);
    return res.status(500).json({ error: 'Email send failed' });
  }
}
