import { AppDataSource } from "../../config/database";
import { Vacancy } from "../../entities/vacancy.entity";
import { vacancyDataType } from "../../validations/dataValidation";

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

export default { postVacancy };
