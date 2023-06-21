import { Request, Response, Router } from "express";

const jobApplicationController = Router();

jobApplicationController.post(
  "/apply_job/:vacancy_id",
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
    } catch (error) {
      console.log("the error from posting job application is", error);
    }
  }
);
