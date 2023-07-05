import { Request, Response, Router } from "express";
import { hashPassword } from "../../utils/hashPassword";
import {
  loginEmployer,
  registerEmployer,
} from "../../services/employer/employerService";
import { loginLogger } from "../../middlewares/security/loginLoggerMiddleware";

export const employerController = Router();

employerController.post(
  "/register",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { company_name, email, password, location, contact, description } =
        req.body;
      const hashpassword = await hashPassword(password);
      const employerData = {
        company_name,
        email,
        hashpassword,
        location,
        contact,
        description,
      };
      const registeremployer = await registerEmployer(employerData);
      return res.status(200).send({ msg: `${registeremployer.msg}` });
    } catch (error) {
      console.log("the error from employer register controller is ", error);
    }
  }
);

employerController.post(
  "/login",
  loginLogger,
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const employerLoginData = { email, password };
      const loginToken = await loginEmployer(employerLoginData);
      return res
        .status(200)
        .send({ token: loginToken, msg: "login successful" });
    } catch (error) {
      console.log("the error in employer login controller is", error);
    }
  }
);
