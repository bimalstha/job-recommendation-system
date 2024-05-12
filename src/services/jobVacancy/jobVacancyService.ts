import { Like } from "typeorm";
import AppDataSource from "../../config/database";
import { Vacancy } from "../../entities/vacancy.entity";
import { vacancyDataType } from "../../validations/vacancyData";

export const vacancyRepository = AppDataSource.getRepository(Vacancy);

export const postVacancy = async (data: vacancyDataType) => {
  try {
    const postVacancyData = vacancyRepository.create(data as Vacancy);
    await vacancyRepository.save(postVacancyData);
    return { msg: "vacancy posted" };
  } catch (error) {
    console.log("the error from post vacancy service is", error);
    throw error;
  }
};

export const jobFinder = async (data: string) => {
  try {
    const findJobData = vacancyRepository.find({
      where: [
        { description: Like(`%${data}%`) },
        { description: Like(`%${data}%`) },
      ],
    });
    return findJobData;
  } catch (error) {
    throw error;
  }
};

export const getVacancyDescription = async () => {
  try {
    const vacancyDescription = await vacancyRepository.find({
      where: {
        admin_status: false,
      },
    });
    return vacancyDescription;
  } catch (error) {
    throw error;
  }
};

export default { postVacancy };
