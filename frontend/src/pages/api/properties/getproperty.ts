import { db } from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'GET') return res.status(405).json({error:true,message:"Method Not Allowed"})

        try{
            const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM listedproperties')
            if(rows.length > 0) {
              return  res.status(200).json({error:false,message:'Property value fetched',properties:rows})
            }else{
              return  res.status(404).json({error:true,message:"No Data Found"})
            }
        }catch(err){
            console.log("Error fetching listed properties",err)
           return res.status(405).json({error:true,message:"Internal Server Erorr"})
        }
}