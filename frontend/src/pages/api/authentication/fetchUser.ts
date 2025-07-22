import { db } from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method !== "POST") return res.status(405).json({error:true,message:"Method Not Allowed"})

        const {userId} = req.body
        if(!userId) return res.status(404).json({error:true,message:"UserId Missing"})
        const id = userId.replace('CLR-USR-', '')

            try{
                    const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM authentication WHERE id = ?',[id])
                    if(rows.length > 0){
                        const data = rows[0]
                        return res.status(200).json({error:false,message:"User Details Fetched",name:data.Name,profile:data.Profile,userId:`CLR-USR-${data.id}`,role:data.role})
                    }else {
                    return res.status(404).json({ error: true, message: "User not found" });
                    }

              }catch (err) {
                    console.error("DB Error", err);
                    return res.status(500).json({ error: true, message: "Internal Server Error" });
                    }

}