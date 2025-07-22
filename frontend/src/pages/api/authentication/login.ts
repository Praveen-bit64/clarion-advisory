import { db } from "@/app/lib/db";
import { NextApiRequest,NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { RowDataPacket } from "mysql2";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).json({error:true,message:"Method Not Allowed"})

        const {user,password} = req.body
        if(!user || !password) return res.status(405).json({error:true,message:"Required Feilds missing"})

        try{
            const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM authentication WHERE Email = ? OR Phone = ?',[user,user])
           if(rows.length > 0){
             const users = rows[0]
            const validUser = await bcrypt.compare(password,users.Password)
            if(validUser){
                return res.status(200).json({error:false,message:`Welcome ${users.Name}`,name:users.Name,userId:`CLR-USR-${users.id}`,role:users.role})
            }else{
                return res.status(400).json({error:true,message:'Invalid Credentials'})
            }
           }else{
            return res.status(400).json({error:true,message:"User Not Found!"})
           }
        }catch(err){
            return res.status(500).json({error:true,message:"Internal Server Error"})
        }
}