import AppDataSource from "../../config/database";
import { Employer } from "../../entities/employer.entity";
import { verifyPassword } from "../../utils/hashPassword";
import jwt from "jsonwebtoken";
import { sendOtpMail } from "../multifactor/sendOtp";
import { verifyOtp } from "../multifactor/verifyOtp";
import { uuidType } from "../../validations/uuid/uuid.validation";
import { employerDataType } from "../../validations/employerData";

export const employerRepository = AppDataSource.getRepository(Employer);

export const registerEmployer = async (data) => {
  try {
    const findExistedEmployer = employerRepository.find({
      where: {
        email: data.email,
      },
    });
    if (findExistedEmployer) {
      throw { msg: "user with this email already exist" };
    }
    const register = employerRepository.create(data as Employer);
    await employerRepository.save(register);
    return { msg: "registration successful" };
  } catch (error) {
    console.log("the error from the register employer service is", error);
  }
};

export const loginEmployer = async (data) => {
  try {
    const findEmployer = await employerRepository.find({
      where: {
        email: data.email,
      },
    });
    if (!findEmployer) {
      throw { msg: "invalid credentials" };
    }
    const verifypassword = await verifyPassword(
      findEmployer[0]["Password"],
      data.password
    );
    if (!verifypassword) {
      throw { msg: "invalid credentials" };
    }
    //sending otp to user for 2FA
    await sendOtpMail(findEmployer[0].email);

    const token = jwt.sign(
      { id: findEmployer[0].id },
      process.env.SECRETKEY_JWT
    );
    return token;
  } catch (error) {
    console.log("the error from employer login service is", error);
  }
};


