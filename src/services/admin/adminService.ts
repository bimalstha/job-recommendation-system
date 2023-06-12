import jwt from "jsonwebtoken";

import { AppDataSource } from "../../config/database";
import { Admin, adminRole } from "../../entities/admin.entity";
import { verifyPassword } from "../../utils/hashPassword";

const adminRepository = AppDataSource.getRepository(Admin);

export const registerAdmin = async (data) => {
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
    const create = adminRepository.create(data as Admin);
    await adminRepository.save(create);
    return { msg: "admin created" };
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data) => {
  try {
    const findAdmin = await adminRepository.findOne({
      where: {
        email: data.email,
      },
    });
    console.log("the data is ", data);
    console.log("the find admin is", findAdmin.password);
    if (!findAdmin) {
      throw { msg: "user do not exits" };
    }
    const checkPassword = await verifyPassword(
      findAdmin.password,
      data.password
    );
    if (!checkPassword) {
      throw { msg: "invalid credentials" };
    }
    const token = jwt.sign({ id: findAdmin.id }, process.env.SECRETKEY_JWT, {
      expiresIn: "24h",
    });
    console.log("the token is", token);
    return token;
  } catch (error) {
    console.log("the error in login is " + error);
  }
};

export default { registerAdmin, login };
