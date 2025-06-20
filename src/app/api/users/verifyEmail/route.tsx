import { Connect } from "@/dbconfig/dbconfig";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
Connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const{token} = reqBody;
    console.log(token);
    const user = await User.findOne({verifyToken:token
    })
    if(!user){
        return NextResponse.json({
            error:"Invalid Token"
        },{
            status:400
        })
    }
console.log(user);
user.isVerified= true
user.verifyToken= undefined
user.verifyTokenExpiry = undefined

await user.save()

return NextResponse.json({
    message:"Email Verified Successfully",
    success:true,},
    {status:200}
)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
