import { Request, Response, Router } from "express";
import { seekerSchema } from "../../validations/seekerData";
import { registerSeeker } from "../../services/seeker/seekerService";

const seekerController = Router();

seekerController.post(
  "/register-seeker",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        full_name,
        email,
        address,
        contact,
        education_Level,
        expertise,
        experience,
        about_me,
      } = req.body;
      const seekerData = {
        full_name,
        email,
        address,
        contact,
        education_Level,
        expertise,
        experience,
        about_me,
      };
      seekerSchema.parse(seekerData);
      const register_seeker = await registerSeeker(seekerData);
      return res.status(200).send({ msg: `${register_seeker.msg}` });
    } catch (error) {
      console.log("the error from the seeker login controller is", error);
    }
  }
);
