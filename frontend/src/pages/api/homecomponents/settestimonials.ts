import cloudinary from "@/app/lib/cloudinary";
import { db } from "@/app/lib/db";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

// Required for formidable
export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  const form = formidable({ multiples: false });

  const parseForm = (): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
  };

  try {
    const { fields, files } = await parseForm();

    // Extract fields safely
    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
    const isvisible = Array.isArray(fields.isvisible) ? fields.isvisible[0] : fields.isvisible;
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const location = Array.isArray(fields.location) ? fields.location[0] : fields.location;
    const comment = Array.isArray(fields.comment) ? fields.comment[0] : fields.comment;
    const rating = Array.isArray(fields.rating) ? fields.rating[0] : fields.rating;
    const profileFile = Array.isArray(files.profile) ? files.profile[0] : files.profile;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ error: true, message: "Required fields missing" });
    }

    const isNewTestimonail = name || comment || rating

    // Upload profile image to Cloudinary
    let profileUrl = "";
    if (profileFile && profileFile.filepath) {
      const uploadResult = await cloudinary.uploader.upload(profileFile.filepath, {
        folder: "testimonials",
      });
      profileUrl = uploadResult.secure_url;
    }

    // Step 1: Save title and description in homecomponents table
    const testimonialHeader = {
      title,
      description,
      isvisible
    };

    await db.execute(
      "UPDATE homecomponents SET testimonials = ? WHERE id = 1",
      [JSON.stringify(testimonialHeader)]
    );

    if(isNewTestimonail){
        // Step 2: Insert individual review into reviews table
    await db.execute(
      "INSERT INTO reviews (name, location, comment, rating, profile) VALUES (?, ?, ?, ?, ?)",
      [name, location, comment, rating, profileUrl]
    );
    }
  

    return res.status(200).json({ error: false, message: "Testimonial submitted successfully" });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}
