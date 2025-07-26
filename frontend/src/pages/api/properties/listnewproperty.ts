import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import { db } from "@/app/lib/db";
import cloudinary from "@/app/lib/cloudinary";

export const config = {
  api: { bodyParser: false },
};

// Form parser helper
const parseForm = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable({ multiples: true, keepExtensions: true, maxFileSize: 200 * 1024 * 1024 });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

// Upload to Cloudinary with optional watermark
const uploadToCloudinary = async (file: File, isVideo = false) => {
  if (!file || !file.filepath) throw new Error("Invalid file upload.");

  const options: any = isVideo
    ? { resource_type: "video" }
    : {
        resource_type: "image",
        transformation: [
      { width: 1000, crop: "limit" }, // Resize image if needed
      {
        overlay: "clarion-logo_zxb6dn", // Public ID of watermark
        gravity: "south_east",          // Position: bottom-right
        opacity: 60,                    // Make it slightly transparent
        width: 200,                     // Resize watermark
        crop: "scale"
      },
      { flags: "layer_apply" }
    ],
      };

  const result = await cloudinary.uploader.upload(file.filepath, options);
  return result;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("📩 Incoming request:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  try {
    const { fields, files } = await parseForm(req);

    const getField = (key: string) => Array.isArray(fields[key]) ? fields[key][0] : fields[key];
    const getBoolean = (key: string) => getField(key) === "true";

    // Extract fields
    const title = getField("title");
    const description = getField("description");
    const propertyCategory = getField("propertyCategory");
    const propertyType = getField("propertyType");
    const propertyPrice = getField("propertyPrice");
    const propertyStatus = getField("propertyStatus");
    const customSlug = getField("customSlug") || null;
    const altTag = getField("altTag") || null;
    const metaTitle = getField("metaTitle") || null;
    const metaDescription = getField("metaDescription") || null;
    const propertyAddress = getField("propertyAddress");
    const propertyState = getField("propertyState");
    const propertyCity = getField("propertyCity");
    const propertyCountry = getField("propertyCountry");
    const zipCode = getField("zipCode");
    const bedrooms = getField("bedrooms") || null;
    const bathrooms = getField("bathrooms") || null;
    const propertySize = getField("propertySize") || null;
    const propertyPhone = getField("propertyPhone") || null;
    const propertyWapp = getField("propertyWapp") || null;
    const furnised = getField("furnised") || null;
    const isBedroomAvailable = getBoolean("isBedroomAvailable");
    const featureTag = getField("featureTag");
    const customFields = getField("customFields");
    const amenities = getField("amenities");

    const thumbnailImage = Array.isArray(files.thumbnailImage) ? files.thumbnailImage[0] : files.thumbnailImage;
    const galleryFiles = Array.isArray(files.galleryImage)
      ? files.galleryImage
      : files.galleryImage ? [files.galleryImage] : [];

    const propertyVideo = Array.isArray(files.propertyVideo) ? files.propertyVideo[0] : files.propertyVideo;

    if (!thumbnailImage) throw new Error("Thumbnail image is required.");

    // ✅ Upload thumbnail with watermark
    const thumbResult = await uploadToCloudinary(thumbnailImage);

    // ✅ Upload gallery with watermark
    const galleryUrls: string[] = [];
    for (const img of galleryFiles) {
      const uploaded = await uploadToCloudinary(img as File);
      galleryUrls.push(uploaded.secure_url);
    }

    // ✅ Upload video without watermark
    let videoUrl: string | null = null;
    if (propertyVideo) {
      const uploaded = await uploadToCloudinary(propertyVideo, true);
      videoUrl = uploaded.secure_url;
    }

    // ✅ Insert into MySQL
    const insertQuery = `
      INSERT INTO listedProperties (
        title, description, propertyCategory, propertyType, propertyPrice,
        propertyStatus, customSlug, thumbnailImage, galleryImage, propertyVideo,
        altTag, metaTitle, metaDescription, propertyAddress, propertyState,
        propertyCity, propertyCountry, zipCode, isBedroomAvailable,
        bedrooms, bathrooms, propertySize, propertyPhone, propertyWapp, furnished, featureTag,
        customFields, amenities
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      title, description, propertyCategory, propertyType, propertyPrice,
      propertyStatus, customSlug, thumbResult.secure_url, JSON.stringify(galleryUrls),
      videoUrl, altTag, metaTitle, metaDescription, propertyAddress, propertyState,
      propertyCity, propertyCountry, zipCode, isBedroomAvailable,
      bedrooms, bathrooms, propertySize, propertyPhone, propertyWapp, furnised, featureTag,
      customFields || null, amenities || null,
    ];

    await db.execute(insertQuery, values);

    return res.status(200).json({ error: false, message: "Property listed successfully!" });
  } catch (error: any) {
    console.error("❌ Error:", error);
    return res.status(500).json({ error: true, message: error.message || "Internal Server Error" });
  }
}
