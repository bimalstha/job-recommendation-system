import { AppDataSource } from "../../config/database";
import { Employer } from "../../entities/employer.entity";
import { verifyPassword } from "../../utils/hashPassword";
import jwt from "jsonwebtoken";

const employerRepository = AppDataSource.getRepository(Employer);

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
    const findEmployer = employerRepository.find({
      where: {
        email: data.email,
      },
    });
    if (!findEmployer) {
      throw { msg: "invalid credentials" };
    }
    const verifypassword = await verifyPassword(
      findEmployer[0].password,
      data.password
    );
    if (!verifyPassword) {
      throw { msg: "invalid credentials" };
    }
    const token = jwt.sign(
      { id: findEmployer[0].id },
      process.env.SECRETKEY_JWT
    );
    return token;
  } catch (error) {
    console.log("the error from employer login service is", error);
  }
};
