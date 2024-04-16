import { Request, Response, Router } from "express";
import { job_applied } from "../../services/jobApplication/jobApplicationService";

export const jobApplicationController = Router();

jobApplicationController.post(
  "/apply_job/:job_vacancy_id",
  async (req: Request, res: Response): Promise<object> => {
    try {
      const id = req.params.job_vacancy_id;
      const apply_job: object = await job_applied(id);
      if (apply_job !== null) {
        res.status(200).send({ msg: "Application Successfull" });
      } else return res.status(200).send({ msg: "error" });
    } catch (error) {
      console.log("the error from posting job application is", error);
      throw error;
    }
  }
);
