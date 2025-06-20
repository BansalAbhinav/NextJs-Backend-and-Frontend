import { Connect } from "@/dbconfig/dbconfig";
import {User} from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
Connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password }:any = reqBody;
    //validation not handle
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User ALready Exit" }, { status: 400 });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })
        const savedUser = await newUser.save()
        console.log(savedUser);

        //SEND VERIFICATION EMAIL
        await sendEmail({email,emailType:"Verify",userId:savedUser._id})

        return NextResponse.json({
            message:"User registered Successfully ",
            success:true,
            savedUser
        })
        
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
