import { Connect } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helpers/getdatafromtoken";
import {User} from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
Connect();

export async function POST(request:NextRequest){
    try{
        const userID = await getDataFromToken(request)
     
        const user = await  User.findOne({_id:userID}).
        select("-password")
        
        if(!user){
            return NextResponse.json({
                error:"User Not Found",
            },{status:404})
        }
    return NextResponse.json({
        message:"User Data Found",
        data:user
    })
    
    }
    catch(error:any){
        return NextResponse.json({
            error:error.message
        },{status:500})
    }
}