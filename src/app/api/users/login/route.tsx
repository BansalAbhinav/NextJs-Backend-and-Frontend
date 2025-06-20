import { Connect } from "@/dbconfig/dbconfig";
import {User} from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
Connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const{email, password} = reqBody;
        console.log(reqBody);
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                error:"User Does not exist "
            },{status:400})
        }
console.log("user existed"+ user);
const validPassword =await bcryptjs.compare(password,user.password)

if(!validPassword){
    return NextResponse.json({
        error:"Check your Credentials not valid"
    },{status:400})
}
const tokenPayload = {
    id:user._id,
    username:user.username,
    email:user.email
}

 const token = await jwt.sign(tokenPayload,
    process.env.TOKEN_SECRET!,
    {expiresIn:'1h'})

const response = NextResponse.json({
    message:"Login Successfully",
    Success:true
})

response.cookies.set('token',token,{
    httpOnly:true
})
return response;






    }
    catch(error:any){
        return NextResponse.json({
            error:error.message
        },
    {status:500})
    }
}