import cloudinary from "@/app/lib/cloudinary";
import { db } from "@/app/lib/db";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api:{bodyParser:false}
}
export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).json({error:true,message:"Method Not Allowed"})
        const form = formidable({keepExtensions:true})
        form.parse(req, async(err,fields,files) => {
            if(err){
                console.error("Form parsing error:", err);
                return res.status(500).json({error:true,message:"Formidable Error"})
            }
            const siteName = fields.siteName?.[0] || fields.siteName
            const siteLogo = Array.isArray(files.siteLogo) ? files.siteLogo[0] : files.siteLogo;
            console.log(siteName,siteLogo,'checkSiteinfo');
            
            if (!siteName || !siteLogo) {
      return res.status(400).json({ error: true, message: "Missing site name or logo" });
    }

        
        try{         
                const uploadLogo = await cloudinary.uploader.upload(siteLogo?.filepath)
                await db.execute(
        'UPDATE adminSettings SET siteInfo = ? LIMIT 1',
        [JSON.stringify({ siteName, siteLogo: uploadLogo.secure_url })]
      );

                return res.status(200).json({error:false,message:"Site Info Updated successfully"})
            
        }catch(err){
            console.error(err,"Error occured while updating site info");
            return res.status(400).json({error:true,message:"Unable to update site info, try again later"})
        }
        })
}