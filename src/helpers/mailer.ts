import { User } from "@/models/user.models";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }:any  ) => {
  try {

    // TODO: config mail for usage 

    const hashedToken = await bcryptjs.hash(userId.toString(),10)



    if(emailType==="Verify"){
     const updatedUser= await User.findByIdAndUpdate(userId,
        {$set: {
        verifyToken:hashedToken, 
        verifyTokenExpiry:Date.now()+3600000
      }})
    }else if(emailType==="Reset"){
       await User.findByIdAndUpdate(userId,
       {$set: {
        forgotPasswordToken:hashedToken,
        forgotPasswordTokenExpiry:Date.now()+3600000
      }})
    }
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: "maddison53@ethereal.email",
    //     pass: "jn7jnAPss4f63QBp6D",
    //   },
    // });

    // Looking to send emails in production? Check out our Email API/SMTP product!
const  transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "744f64156ec294", //🤌
    pass: "9d330b6a8eaf71"//🤌🤦‍♀️
  }
});
    const mailOption = {
      from: "abhinav@.ai",
      to: email,
      subject:
        emailType === "Verify" ? "Verify ypur Email" : "Reset your Password",
      // html: `<p> Click Here <a href="${process.env.DOMAIN}/VerifyToken=${hashedToken}" ></a> </p>`, // HTML body
      html: `<h2 style="color: #333;">Hello Abhinav ${hashedToken}👋</h2>
    <p>This is a <strong>test email</strong> sent via Mailtrap. ${process.env.DOMAIN}</p>
    <p>If you received this, your email setup is working perfectly! ✅</p>
    <hr />
    <p style="font-size: 12px; color: #888;">Mailtrap Test | GEHU Dev</p>`, // HTML body
    };
    const mailResponse = await transporter.sendMail(mailOption);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
