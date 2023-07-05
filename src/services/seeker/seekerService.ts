import AppDataSource from "../../config/database";
import Jwt from "jsonwebtoken";
import { Seeker } from "../../entities/seeker.entity";
import { verifyPassword } from "../../utils/hashPassword";
import { sendOtpMail } from "../multifactor/sendOtp";
import { verifyOtp } from "../multifactor/verifyOtp";

export const seekerRepository = AppDataSource.getRepository(Seeker);

export const registerSeeker = async (data) => {
  try {
    const createSeeker = seekerRepository.create(data as Seeker);
    await seekerRepository.save(createSeeker);
    return { msg: "seeker registered" };
  } catch (error) {
    console.log("the error in registering seeker from service is", error);
  }
};

export const seekerLogin = async (data) => {
  try {
    const findSeeker = await seekerRepository.find({
      where: {
        email: data.email,
      },
    });
    if (!findSeeker) {
      return { msg: "invalid credentials" };
    }
    const verify_password = await verifyPassword(
      findSeeker[0].password,
      data.password
    );
    if (!verify_password) {
      return { msg: "invalid credentials" };
    }

    await sendOtpMail(findSeeker[0].email);
    let otp: string;
    const token = await verifyOtp(findSeeker[0].email, otp);
    // const token = Jwt.sign(
    //   { id: findSeeker[0].id },
    //   process.env.SECRETKEY_JWT,
    //   { expiresIn: "30d" }
    // );
    return token;
  } catch (error) {
    console.log("the error while login in service is", error);
  }
};

export default { registerSeeker };
