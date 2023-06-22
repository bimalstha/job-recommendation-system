import { Request, Response, Router } from "express";
import { vacancySchema, vacancyDataType } from "../../validations/vacancyData";
import {
  jobFinder,
  postVacancy,
} from "../../services/jobVacancy/jobVacancyService";

export const vacancyController = Router();

vacancyController.post(
  "/post-vacancy",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title, description, location } = req.body;
      const vacancyData: vacancyDataType = { title, description, location };
      console.log("the vacancy data are", vacancyData);
      vacancySchema.parse(vacancyData);
      const post_vacancy = await postVacancy(vacancyData);
      return res.status(200).send({ msg: `${post_vacancy.msg}` });
    } catch (error) {
      console.log(`the error in posting vacancy is + ${error}`);
    }
  }
);

vacancyController.get(
  "/search/:findJob",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const findJob = req.params.findJob;
      const resultJob = await jobFinder(findJob);
      return res.send(resultJob);
    } catch (error) {
      console.log("the error from the findjob is ", error);
    }
  }
);
