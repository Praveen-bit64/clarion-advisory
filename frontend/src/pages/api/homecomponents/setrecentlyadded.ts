import { db } from "@/app/lib/db";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).json({error:true,message:'Method Not Allowed'})

        try{
            const {inputValues} = req.body
            console.log(inputValues,"inputvaluefromrecentlyadeedd");
            db.execute('UPDATE homecomponents SET recentlistings = ?',[JSON.stringify(inputValues)])
            return res.status(200).json({error:false,message:"Component updated"})
        }catch(err){
            console.log("Internal Server Error",err)
            return res.status(500).json({error:true,message:"Internal Server Error"})
        }
}