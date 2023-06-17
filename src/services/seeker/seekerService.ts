import { AppDataSource } from "../../config/database";
import { Seeker } from "../../entities/seeker.entity";
import { seekerDataType } from "../../validations/seekerData";

const seekerRepository = AppDataSource.getRepository(Seeker);

export const registerSeeker = async (data) => {
  try {
    const createSeeker = seekerRepository.create(data as Seeker);
    await seekerRepository.save(createSeeker);
    return { msg: "seeker registered" };
  } catch (error) {
    console.log("the error in registering seeker from service is", error);
  }
};

export default { registerSeeker };
