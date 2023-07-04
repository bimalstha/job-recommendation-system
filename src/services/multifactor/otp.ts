import sendGrid from "@sendgrid/mail";
import { random } from "../../utils/random";
import { storeOtp } from "./storeOtp";

export function sendMail(receiver) {
  const otp = random();
  sendGrid.setApiKey(process.env.api_key);
  const msg = {
    to: receiver,
    from: process.env.SENDER_EMAIL,
    subject: "verification code",
    text: otp,
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Mr Wanderer</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes. If you didn’t request this, you can ignore this email.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Mr Wanderer</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Mr Wanderer</p>
    </div>
   </div>
   </div>`,
  };
  sendGrid.send(msg).then(() => {
    console.log("email sent with otp");
    storeOtp(receiver, otp);
  });
}