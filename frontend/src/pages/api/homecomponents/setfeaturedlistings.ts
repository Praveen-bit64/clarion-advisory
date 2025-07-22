import { db } from "@/app/lib/db";
import formidable from "formidable";
import { NextApiRequest,NextApiResponse } from "next";

export const config = {
    api:{bodyParser:false}
}

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'POST') res.status(405).json({error:true,message:"Method not allowed"})

       const form = formidable()
       form.parse(req,(err,fields,files) =>{
        if(err){
            console.log("Formidable parse error",err)
            return res.status(405).json({error:true,message:"Formidable Error"})
            
        }else{
            try{
                const {title,description,isvisible} = fields
            console.log('chceking inputs',title,description,isvisible)
            db.execute("UPDATE  homecomponents SET featuredlistings = ?  WHERE id = 1",[JSON.stringify({title:title?.[0],description:description?.[0],isvisible:isvisible?.[0]})])
            return res.status(200).json({error:false,message:'component Updated'})
            }catch(err){
                console.log("internal server error",err)
                res.status(500).json({error:true,message:"Internal Server Error"})
            }
        }
       })
        
}