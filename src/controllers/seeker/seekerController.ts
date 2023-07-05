import { Request, Response, Router } from "express";
import { seekerLoginSchema, seekerSchema } from "../../validations/seekerData";
import {
  registerSeeker,
  seekerLogin,
} from "../../services/seeker/seekerService";
import { hashPassword } from "../../utils/hashPassword";
import { loginLogger } from "../../middlewares/security/loginLoggerMiddleware";

export const seekerController = Router();

seekerController.post(
  "/register-seeker",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        full_name,
        email,
        password,
        location,
        contact,
        education_Level,
        expertise,
        experience,
        about_me,
      } = req.body;
      seekerSchema.parse(req.body);
      const hashpassword = await hashPassword(password);
      const seekerData = {
        full_name,
        email,
        hashpassword,
        location,
        contact,
        education_Level,
        expertise,
        experience,
        about_me,
      };
      const register_seeker = await registerSeeker(seekerData);
      return res.status(200).send({ msg: `${register_seeker.msg}` });
    } catch (error) {
      console.log("the error from the seeker login controller is", error);
    }
  }
);

seekerController.post(
  "/login",
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
      console.log("the error while login seeker is", error);
    }
  }
);
