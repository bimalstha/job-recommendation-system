import { Request, Response, Router } from "express";
import { vacancySchema, vacancyDataType } from "../../validations/vacancyData";
import { postVacancy } from "../../services/jobVacancy/jobVacancyService";

const vacancyController = Router();

vacancyController.post(
  "/post-vacancy",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title, description, location, id } = req.body;
      const vacancyData: vacancyDataType = { title, description, location, id };
      vacancySchema.parse(vacancyData);
      const post_vacancy = await postVacancy(vacancyData);
      return res.status(200).send({ msg: `${post_vacancy.msg}` });
    } catch (error) {
      res.status(400).send(`the error in posting vacancy is + ${error}`);
    }
  }
);
