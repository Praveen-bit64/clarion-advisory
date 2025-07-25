import { db } from "@/app/lib/db";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    // if(req.method !== 'POST') return res.status(405).json({error:true,message:"Method Not allowed"})

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userAgent = req.headers['user-agent']

    try {
    await db.query('INSERT INTO visitors (ip_address, user_agent) VALUES (?, ?)', [ip, userAgent]);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Visitor logging failed:', error);
    return res.status(500).json({ success: false });
  }
}