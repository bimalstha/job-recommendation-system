import moment from "moment";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../../utils/hashPassword";
import { otpRepo } from "./storeOtp";
import { seekerRepository } from "../seeker/seekerService";
import { employerRepository } from "../employer/employerService";

export async function verifyOtp(receiverEmail, otpFrom_user,ipAddress) {
  try {
    const now = moment().toDate();
    const data = await otpRepo.find({
      where: {
        email: receiverEmail,
      },
      order: {
        createdAt: "DESC",
      },
    });
    if (data.length < 1) {
      throw { message: "internal error occured" };
    } else {
      if (
        data[0].email == receiverEmail &&
        (await verifyPassword(data[0].otp, otpFrom_user)) &&
        data[0].expiresAt < now
      ) {
        //finding for seeker
        const seeker = await seekerRepository.find({
          where: {
            email: receiverEmail,
          },
        });
        //token for seeker
        if (seeker.length > 1) {
          const token = jwt.sign(
            { id: seeker[0].id },
            process.env.SECRETKEY_JWT,
            { expiresIn: "24h" }
          );
          return token;
        }

        //finding for employer
        const employer = await employerRepository.find({
          where: {
            email: receiverEmail,
          },
        });
        //token for employer
        if (employer.length > 1) {
          const token = jwt.sign(
            { id: seeker[0].id },
            process.env.SECRETKEY_JWT,
            { expiresIn: "24h" }
          );
          return token;
        }
      }
    }
  } catch (error) {
    console.log("the error from verifyOtp is", error);
  }
}
