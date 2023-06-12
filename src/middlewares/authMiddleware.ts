import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string =
      (req.headers.authorization as string) ||
      (req.headers.Authorization as string);
    if (!token) {
      throw { msg: "no token found" };
    }
    const verify: any = jwt.verify(token, process.env.SECRETKEY_JWT);
    res.locals.id = verify?.id;
    next();
  } catch (error) {
    console.log("the error in auth middleware is", error);
  }
};
