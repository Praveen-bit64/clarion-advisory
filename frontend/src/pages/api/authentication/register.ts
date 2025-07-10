import cloudinary from "@/app/lib/cloudinary";
import { db } from "@/app/lib/db";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { RowDataPacket } from "mysql2";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: true, message: "Form parsing error" });
    }

    const getField = (val: any) => Array.isArray(val) ? val[0] : val;

    const name = getField(fields.name);
    const city = getField(fields.city);
    const email = getField(fields.email);
    const phone = getField(fields.phone) || null; // optional
    const password = getField(fields.password);
    const profileFile = Array.isArray(files.profile) ? files.profile[0] : files.profile || null;

    //  Only required fields check
    if (!name || !city || !email || !password) {
      return res.status(400).json({ error: true, message: "Required fields are missing" });
    }

    try {
      let profileUrl: string | null = null;

      //  Upload profile image only if provided
      if (profileFile) {
        const upload = await cloudinary.uploader.upload(profileFile.filepath);
        profileUrl = upload.secure_url;
      }
      
      //hashed password 
      const hashedPassword = await bcrypt.hash(password, 10);

      const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM authentication WHERE Email = ? OR Phone = ?',[email,phone])

      if(rows.length > 0){
        return res.status(400).json({error:true,message:"Email or Phone Already Exists"})
      }else{
        
      //  Insert into DB with null-safe values
      await db.execute(
        'INSERT INTO authentication (Name, Email, City, Profile, Phone, Password) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, city, profileUrl, phone, hashedPassword]
      );

      return res.status(200).json({ error: false, message: "User Created Successfully" });
      }

    } catch (err) {
      console.error(" Error Registering Form:", err);
      return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  });
}
