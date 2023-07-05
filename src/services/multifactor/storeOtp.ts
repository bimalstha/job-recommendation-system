import AppDataSource from "../../config/database";
import moment from "moment";
import { Multifactor } from "../../entities/security/multifactor.entity";
import { hashPassword } from "../../utils/hashPassword";

export const otpRepo = AppDataSource.getRepository(Multifactor);

export async function storeOtp(email, Otp) {
  try {
    const expiration_time = moment(new Date()).add(5, "m").toDate();
    const hashedOtp = await hashPassword(Otp);
    const otp = otpRepo.create({
      email: email,
      otp: hashedOtp,
      expiresAt: expiration_time,
    });
    await otpRepo.save(otp);
  } catch (error) {
    console.log("the error from store opt is", error);
  }
}
