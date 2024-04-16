import { Request, Response, Router } from "express";
import { registerAdmin, loginAdmin } from "../../services/admin/adminService";
import { hashPassword } from "../../utils/hashPassword";
import {
  adminLoginSchema,
  adminLoginType,
  adminSignUpSchema,
} from "../../validations/adminData";

export const adminController = Router();

adminController.post("/register", async (req: Request, res: Response) => {
  try {
    let { Full_Name, email, password } = req.body;
    adminSignUpSchema.parse(req.body);
    const hash = await hashPassword(password);
    req.body.password = hash;
    const data = req.body;
    const register = await registerAdmin(data);
    return res.send({ msg: register });
  } catch (error) {
    console.log("the error from registering admin is", error);
    throw error;
  }
});

adminController.post("/login-as-admin", async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;
    adminLoginSchema.parse(req.body);
    const loginData: adminLoginType = { email, password };
    const token = await loginAdmin(loginData);
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.send({ token: token, msg: "login successful" });
  } catch (error) {
    console.log("the error from admin login is", error);
    throw error;
  }
});
