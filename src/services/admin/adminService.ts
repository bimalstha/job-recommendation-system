import { AppDataSource } from "../../config/database";
import { Admin } from "typeorm";

const adminRepository = AppDataSource.getRepository(Admin);

export const registerAdmin = async (data) => {
  try {
    const create = adminRepository.create(data);
    adminRepository.save(create);
    return { msg: "admin created" };
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data) => {
  try {
    const login = await adminRepository.find({
      where: {
        email: data.email,
        password: data.password
      },
    });
  } catch (error) {}
};

export default { registerAdmin ,login};
