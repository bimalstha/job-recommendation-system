import { Request, Response, Router } from "express";
import { registerAdmin, login } from "../../services/admin/adminService";
import { hashPassword } from "../../utils/hashPassword";

export const adminController = Router();

adminController.post("/register", async (req: Request, res: Response) => {
  try {
    let { Full_Name, email, password } = req.body;
    const hash = await hashPassword(password);
    req.body.password = hash;
    console.log("hashed password is", hash);
    let data = req.body;
    const register = await registerAdmin(data);
    return res.send({ msg: register });
  } catch (error) {
    console.log(error);
  }
});

adminController.post("/login", async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;
    const loginData = { email, password };
    const token = await login(loginData);
    console.log("token is ", token);
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.send({ token: token, msg: "login successful" });
  } catch (error) {
    console.log(error);
  }
});
