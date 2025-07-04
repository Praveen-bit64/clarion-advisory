import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: true, message: 'Method Not Allowed' });
  }

  try {
    const [rows]: any = await db.execute('SELECT contactInfo FROM adminSettings LIMIT 1');

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: true, message: 'No contact info found' });
    }

    const contactInfo = JSON.parse(rows[0].contactInfo); 
    console.log(contactInfo,'contactInfofromapi');
    
    return res.status(200).json({ error: false, contactInfo });
  } catch (err) {
    console.error('Error fetching contact info:', err);
    return res.status(500).json({ error: true, message: 'Server error. Please try again later.' });
  }
}
