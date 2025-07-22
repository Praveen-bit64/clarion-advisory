import { db } from "@/app/lib/db";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).json({error:true,message:"Method Not Allowed"})

        try{
            const {copyright,popularsearch,discover} = req.body
            const footerContent = JSON.stringify({copyright,popularsearch,discover})
            await db.execute('UPDATE homecomponents SET footer = ? WHERE id = 1',[footerContent])
            return res.status(200).json({error:false,message:"Component Updated"})
        }catch(err){
            console.log("setfooter Error",err)
            return res.status(500).json({error:true,message:"Internal Server Error"})
        }
}