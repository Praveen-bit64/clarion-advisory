import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/app/lib/cloudinary";
import {db} from '@/app/lib/db'
import formidable from "formidable";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Form parsing failed' });

    try {
      const file = Array.isArray(files.image) ? files.image[0] : files.image
      if(!file) return
      const uploadRes = await cloudinary.uploader.upload(file.filepath);

      const [result] = await db.execute(
        'INSERT INTO testimg (image_url) VALUES (?)',
        [uploadRes.secure_url]
      );

      res.status(200).json({ message: 'Uploaded successfully', imageUrl: uploadRes.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Image upload or DB error' });
    }
  });
}