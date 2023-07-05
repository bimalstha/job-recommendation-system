import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { verifyOtp } from "../../services/multifactor/verifyOtp";

const multifactorController = Router();

multifactorController.post(
  "/verify-otp",
  async (req: Request, res: Response) => {
    try {
      const ipAddress = req.socket.remoteAddress;
      const token =
        (req.headers.verification as string) ||
        (req.headers.Verification as string);
      const { otp } = req.body;
      const user: any = jwt.verify(token, process.env.SECRETKEY_JWT);
      res.locals.email = user.email;
      const cookie = await verifyOtp(res.locals.email, otp, ipAddress);
      return res.status(200).send({ cookie });
    } catch (error) {
      console.log("the error from multifactor controller is ", error);
    }
  }
);
