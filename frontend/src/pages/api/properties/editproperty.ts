import { db } from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).json({error:true,message:'Method Not Allowed'})

        try{
            const {id} = req.body
            if(!id) return res.status(404).json({error:true,message:'Property Id missing'})

              const [rows] =  await db.execute<RowDataPacket[]>("SELECT * FROM listedproperties WHERE id = ?",[id])
              if(rows.length > 0) {
                return res.status(200).json({error:false,message:"Details fetched",propertyDetail:rows[0]})
              }else{
                return res.status(404).json({error:true,message:"No Data Found"})
              }
        }catch(err){
            console.log("Error Feching property Detail Edit",err)
            return res.status(500).json({error:true,message:"Internal server Error"})
        }
}