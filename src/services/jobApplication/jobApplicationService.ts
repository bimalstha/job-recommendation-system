import AppDataSource from "../../config/database";
import {
  Application,
  applicationStatus,
} from "../../entities/application.entity";
import { uuidType } from "../../validations/uuid/uuid.validation";
import { vacancyRepository } from "../jobVacancy/jobVacancyService";

const applicationRepository = AppDataSource.getRepository(Application);

export const job_applied = async (jobId: uuidType) => {
  try {
    const jobToApply = await vacancyRepository.find({
      where: {
        id: jobId,
      },
    });
    if (jobToApply !== null) {
      applicationRepository.update(jobId, {
        Application_status: applicationStatus.AP,
      });
      return { msg: "Job Applied" };
    } else return;
  } catch (error) {
    throw error;
  }
};
