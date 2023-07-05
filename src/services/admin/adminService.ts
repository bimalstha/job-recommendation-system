import jwt from "jsonwebtoken";

import AppDataSource from "../../config/database";
import { Admin, adminRole } from "../../entities/admin.entity";
import { verifyPassword } from "../../utils/hashPassword";
import { adminLoginType, adminSignUpType } from "../../validations/adminData";
import { sendOtpMail } from "../multifactor/sendOtp";

const adminRepository = AppDataSource.getRepository(Admin);

export const registerAdmin = async (data: adminSignUpType) => {
  try {
    //only one super admin is allowed
    const findRole = await adminRepository.find({
      where: {
        role: adminRole.SA,
      },
    });
    if (findRole.length && data.role === "Super Admin") {
      return { msg: "admin with role:super admin, already exits" };
    }
    const createAdmin = adminRepository.create(data as Admin);
    await adminRepository.save(createAdmin);
    return { msg: "admin created" };
  } catch (error) {
    console.log("this error is from admin registering service", error);
  }
};

export const loginAdmin = async (data: adminLoginType) => {
  try {
    const findAdmin = await adminRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!findAdmin) {
      throw { msg: "invalid credentials" };
    }
    const checkPassword = await verifyPassword(
      findAdmin.password,
      data.password
    );
    if (!checkPassword) {
      throw { msg: "invalid credentials" };
    }
    sendOtpMail(findAdmin.email)
    const token = jwt.sign({ id: findAdmin.id , role: findAdmin.role}, process.env.SECRETKEY_JWT, {
      expiresIn: "24h",
    });
    return token;
  } catch (error) {
    console.log("the error in login is " + error);
  }
};

export default { registerAdmin, loginAdmin };
