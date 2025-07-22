import { db } from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).json({error:true,message:"Method Not Allowed"})

        try{
            const {email} = req.body
            const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM subscribed WHERE email = ?',[email])
            if(rows.length > 0) {
                return res.status(200).json({error:true,message:"User Already a Member"})
            }else{
                await db.execute('INSERT INTO subscribed (email) values (?)',[email])
                return res.status(200).json({error:false,message:"Subscribed!!"})
            }
        }catch(err){
            console.log("Subscibtion Error",err)
            return res.status(500).json({error:true,message:"Internal Server Error"})
        }
}