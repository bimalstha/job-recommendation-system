import { Like } from "typeorm";
import AppDataSource from "../../config/database";
import { Vacancy } from "../../entities/vacancy.entity";
import { vacancyDataType } from "../../validations/vacancyData";

const vacancyRepository = AppDataSource.getRepository(Vacancy);

export const postVacancy = async (data: vacancyDataType) => {
  try {
    const postVacancyData = vacancyRepository.create(data as Vacancy);
    await vacancyRepository.save(postVacancyData);
    return { msg: "vacancy posted" };
  } catch (error) {
    console.log("the error from post vacancy service is", error);
  }
};

export const jobFinder = async (data: string) => {
  try {
    console.log("the value for finding the job is ", data);
    const findJobData = vacancyRepository.find({
      where: [
        {        description: Like(`%${data}%`)},
        {        description: Like(`%${data}%`)}
      ],
    });
    return findJobData;
  } catch (error) {
    console.log("the error from the jobfinder service is ", error);
  }
};

export default { postVacancy };
