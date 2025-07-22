import { db } from "@/app/lib/db";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).json({error:true,message:'Method Not allowed'})

        try{
            const {contentValues} = req.body
           const  {title,description,isVisible,sec1Title,sec1Count,sec2Title,sec2Count,sec3Title,sec3Count} = contentValues
            console.log({title,description,isVisible,sec1Title,sec1Count,sec2Title,sec2Count,sec3Title,sec3Count});
            db.execute('UPDATE homecomponents SET counter = ? WHERE id = 1',[JSON.stringify(contentValues)])
            return res.status(200).json({error:false,message:'Component updated'})
        }catch(err){
            console.log('Internal Server Error',err)
            return res.status(500).json({error:true,message:"Internal Server Error"})
            
        }
}