import AppDataSource from "../../config/database";
import Jwt from "jsonwebtoken";
import { Seeker } from "../../entities/seeker.entity";
import { verifyPassword } from "../../utils/hashPassword";
import { sendOtpMail } from "../multifactor/sendOtp";
import { verifyOtp } from "../multifactor/verifyOtp";
import { uuidType } from "../../validations/uuid/uuid.validation";
import { seekerLoginDataTpe } from "../../validations/seekerData";

export const seekerRepository = AppDataSource.getRepository(Seeker);

export const registerSeeker = async (data) => {
  try {
    const createSeeker = seekerRepository.create(data);
    await seekerRepository.save(createSeeker);
    return { msg: "seeker registered" };
  } catch (error) {
    throw error;
  }
};

export const seekerLogin = async (data: seekerLoginDataTpe) => {
  try {
    const findSeeker = await seekerRepository.find({
      where: {
        email: data.email,
      },
    });
    if (!findSeeker) {
      return { msg: "invalid credentials" };
    }
    console.log(findSeeker);
    const verify_password = await verifyPassword(
      findSeeker[0].password,
      data.password
    );
    if (!verify_password) {
      return { msg: "invalid credentials" };
    }
console.log("bimal");
    //await sendOtpMail(findSeeker[0].email);
    const token = Jwt.sign(
      { id: findSeeker[0].id },
      process.env.SECRETKEY_JWT,
      { expiresIn: "30d" }
    );
    return token;
  } catch (error) {
    console.log("the error while login in service is", error);
  }
};

export const getSeekerById = async (id: uuidType) => {
  try {
    const seekerById = await seekerRepository.find({
      where: {
        id,
      },
    });
    return seekerById;
  } catch (error) {
    throw error;
  }
};

export const getSeekerDescription = async (id: uuidType) => {
  try {
    const getSeeker = await seekerRepository.find({ where: { id } });
    return getSeeker[0]["about_me"];
  } catch (error) {
    throw error;
  }
};

export default {
  registerSeeker,
  seekerLogin,
  getSeekerById,
  getSeekerDescription,
};
