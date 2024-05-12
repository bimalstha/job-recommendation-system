import { Request, Response, Router } from "express";
import { seekerLoginSchema, seekerSchema } from "../../validations/seekerData";
import {
  getSeekerDescription,
  registerSeeker,
  seekerLogin,
} from "../../services/seeker/seekerService";
import { hashPassword } from "../../utils/hashPassword";
import { loginLogger } from "../../middlewares/security/loginLoggerMiddleware";
import { getVacancyDescription } from "../../services/jobVacancy/jobVacancyService";
import { cosineValue } from "../../services/algorithm/cosine.algorithm";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const seekerController = Router();

seekerController.post(
  "/register-seeker",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      // const {
      //   full_name,
      //   email,
      //   password,
      //   location,
      //   contact,
      //   education_Level,
      //   expertise,
      //   experience,
      //   about_me,
      // } = req.body;
      req.body.password = await hashPassword(req.body.password);
      seekerSchema.parse(req.body);

      const register_seeker = await registerSeeker(req.body);
      return res.status(200).send({ msg: `${register_seeker.msg}` });
    } catch (error) {
      throw error;
    }
  }
);

seekerController.post(
  "/seeker-login",
  loginLogger,
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      seekerLoginSchema.parse(req.body);
      const data = { email, password };
      const seeker_login = await seekerLogin(data);
      return res
        .status(200)
        .send({ token: seeker_login, msg: "login successful" });
    } catch (error) {
      throw error;
    }
  }
);

seekerController.get(
  "/recommendedJobs",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id;
      const seekerDescription = await getSeekerDescription(userId);
      const vacancyDescription = await getVacancyDescription();
      const recommendedJobsIds = [];
      for (let i = 0; i < vacancyDescription.length; i++) {
        let value = await cosineValue(
          seekerDescription,
          vacancyDescription[i]["description"]
        );
        console.log("value", value);
        if (value > 30) recommendedJobsIds.push(vacancyDescription[i]);
      }
      return res.status(200).send(recommendedJobsIds);
    } catch (error) {
      throw error;
    }
  }
);
