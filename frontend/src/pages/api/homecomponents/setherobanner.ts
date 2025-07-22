import { db } from "@/app/lib/db";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

// Disable default body parsing (required for formidable)
export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  const form = formidable({ multiples: false });

  const parseForm = (): Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }> => {
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
  };

  try {
    const { fields } = await parseForm();
    const { title, description, isvisible } = fields;

    if (!title || !description) {
      return res.status(400).json({ error: true, message: "Required fields missing" });
    }

    const componentData = {
      title:title?.[0],
      description:description?.[0],
      isvisible:isvisible?.[0],
    };

    await db.execute(
      "UPDATE homecomponents  SET herobanner = ? WHERE id = 1",
      [JSON.stringify(componentData)]
    );

    return res.status(200).json({ error: false, message: "Banner Section Updated" });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}
