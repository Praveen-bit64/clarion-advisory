import { db } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, message: 'Method Not Allowed' });
  }

  try {
  const { contactInfo } = req.body;


  if (!contactInfo) {
    return res.status(400).json({ error: true, message: 'Missing contact info' });
  }

  const result = await db.execute(
   'UPDATE adminSettings SET contactInfo = ? LIMIT 1',  
    [JSON.stringify(contactInfo)]
  );

  console.log('DB result:', result);

  return res.status(200).json({ error: false, message: 'Contact info updated successfully!' });
} catch (err) {
  console.error('Error updating contact details:', err);
  return res.status(500).json({ error: true, message: 'Server error. Please try again later.' });
}
}
