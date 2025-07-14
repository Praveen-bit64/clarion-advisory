import { db } from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).json({error:true,message:"Method Not allowed"})

        const {id} = req.body
        if(!id) return res.status(404).json({error:true,message:"Id no available"})

            try{
                const [rows] = await db.execute<RowDataPacket[]>("SELECT * FROM listedproperties WHERE id = ?",[id])
                if(rows.length > 0){
                    const property= await rows[0]
                    return res.status(200).json({error:false,message:"details fetched",propertyDetails:property})
                }else{
                    return res.status(404).json({error:true,message:"No details found"})
                }
            }catch(err){
                console.log("Error fetching property details",err)
                return res.status(405).json({error:true,message:"Internal Server Error"})
                
            }
}