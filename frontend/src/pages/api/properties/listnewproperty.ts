import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import { db } from "@/app/lib/db";
import cloudinary from "@/app/lib/cloudinary";

export const config = {
  api: { bodyParser: false },
};

// ✅ Helper: Parse Form
const parseForm = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    maxFileSize: 200 * 1024 * 1024, // 200 MB for video
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

// ✅ Helper: Upload to Cloudinary
const uploadToCloudinary = async (file: File, isVideo = false) => {
  try {
    if (!file || !file.filepath) {
      console.error("❌ Missing file or filepath:", file);
      throw new Error("Invalid file upload.");
    }

    return await cloudinary.uploader.upload(file.filepath, {
      resource_type: isVideo ? "video" : "image",
    });
  } catch (err) {
    console.error("⛔ Cloudinary error:", err);
    throw new Error("Cloudinary upload failed");
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("📩 Incoming request:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }

  try {
    const { fields, files } = await parseForm(req);
    console.log("📦 Parsed fields:", fields);
    console.log("🖼️ Parsed files:", files);

    const getField = (key: string) => {
      const val = fields[key];
      return Array.isArray(val) ? val[0] : val;
    };

    const getBoolean = (key: string) => {
      const val = getField(key);
      return val === "true";
    };

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
    const furnished = getField("furnished") || null;
    const isBedroomAvailable = getBoolean("isBedroomAvailable");
    const featureTag = getBoolean("featureTag");

    const customFields = getField("customFields");
    const amenities = getField("amenities");

    // ✅ Files
    const thumbnailImage = Array.isArray(files.thumbnailImage)
      ? files.thumbnailImage[0]
      : files.thumbnailImage;

    const galleryImage = Array.isArray(files.galleryImage)
      ? files.galleryImage
      : files.galleryImage
      ? [files.galleryImage]
      : [];

    const propertyVideo = Array.isArray(files.propertyVideo)
      ? files.propertyVideo[0]
      : files.propertyVideo;

    if (!thumbnailImage) {
      throw new Error("Thumbnail image is required.");
    }

    // ✅ Upload thumbnail
    const thumbResult = await uploadToCloudinary(thumbnailImage);

    // ✅ Upload gallery images
    const galleryUrls: string[] = [];
    for (const img of galleryImage) {
      const uploaded = await uploadToCloudinary(img as File);
      galleryUrls.push(uploaded.secure_url);
    }

    // ✅ Upload video if exists
    let videoUrl: string | null = null;
    if (propertyVideo) {
      const uploaded = await uploadToCloudinary(propertyVideo, true); // <-- video = true
      videoUrl = uploaded.secure_url;
    }

    // ✅ DB Insert
    const insertQuery = `
      INSERT INTO listedProperties (
        title, description, propertyCategory, propertyType, propertyPrice,
        propertyStatus, customSlug, thumbnailImage, galleryImage, propertyVideo,
        altTag, metaTitle, metaDescription, propertyAddress, propertyState,
        propertyCity, propertyCountry, zipCode, isBedroomAvailable,
        bedrooms, bathrooms, propertySize, furnished, featureTag,
        customFields, amenities
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      title,
      description,
      propertyCategory,
      propertyType,
      propertyPrice,
      propertyStatus,
      customSlug,
      thumbResult.secure_url,
      JSON.stringify(galleryUrls),
      videoUrl,
      altTag,
      metaTitle,
      metaDescription,
      propertyAddress,
      propertyState,
      propertyCity,
      propertyCountry,
      zipCode,
      isBedroomAvailable,
      bedrooms,
      bathrooms,
      propertySize,
      furnished,
      featureTag,
      customFields ? customFields : null,
      amenities ? amenities : null,
    ];

    await db.execute(insertQuery, values);

    return res.status(200).json({ error: false, message: "Property listed successfully!" });
  } catch (error: any) {
    console.error("❌ Error:", error);
    return res.status(500).json({ error: true, message: error.message || "Internal Server Error" });
  }
}
