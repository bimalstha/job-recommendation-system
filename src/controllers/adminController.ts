import { Router } from "express";
import { registerAdmin, login } from "../services/admin/adminService";

const adminRouter = Router();

adminRouter.post("/", async (req, res) => {
  try {
    let { name, email } = req.body;
    let data = { name, email };
    const register = await registerAdmin(data);
  } catch (error) {}
});


adminRouter.post('/login',async(req,res)=>{
    try {
        let {email, password}= req.body
        const loginData = {email,password}
        const loginAdmin = await login(loginData)
    } catch (error) {
        console.log(error);
    }
})