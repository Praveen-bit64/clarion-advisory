import { db } from "@/app/lib/db";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).json({error:true,message:"Method Not Allowed!"})

        try{
            const {id} = req.body
            if(!id) return res.status(404).json({error:true,message:'Property Id missing!!'})
            await db.execute('DELETE FROM listedproperties WHERE id = ?',[id])
            return res.status(200).json({error:false,message:'Property Deleted!'})
        }catch(err){
            console.log("There was a error deleting property",err)
            return res.status(500).json({error:true,message:"Internal Server Error"})
        }
}