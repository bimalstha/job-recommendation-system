import crypto from "crypto";

export function random() {
  const buffer = crypto.randomBytes(3);
  console.log("buffer is", buffer);
  const otp = buffer.toString("hex");
  console.log("otp",otp);
  return otp;
}