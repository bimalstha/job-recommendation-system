import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../config/database";
import { LoginLogger } from "../../entities/security/loginLogger.entity";

const loggerRepo = AppDataSource.getRepository(LoginLogger);

// function to check if multiple login attempts is made from same device within short period of time
// because it might be the hacking attempts
export async function loginLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const IPAddress = req.socket.remoteAddress;
    const currentDate = new Date().toJSON().slice(0, 10);
    const data = await loggerRepo.find({
      where: {
        ipAddress: IPAddress,
      },
      order: { createdAt: "DESC" },
    });
    if (data.length > 0) {
      if (data[0].createdAt.toString() == currentDate && data[0].trial >= 5) {
        return res.status(500).send({ message: "to many attempts for login" });
      }
    }
    next();
  } catch (error) {
    console.log("the error from the login logger middleware is", error);
  }
}

//updating failed login attempts
export async function failedLoginAttempts(ipAddress) {
  try {
    const IPAddress = ipAddress;
    const currentDate = new Date().toJSON().slice(0, 10);
    const data = await loggerRepo.find({
      where: {
        ipAddress: ipAddress,
      },
      order: {
        createdAt: "DESC",
      },
    });
    if (data.length > 0) {
      if (
        data[0].ipAddress == ipAddress &&
        data[0].createdAt.toString() == currentDate
      ) {
        return loggerRepo.update(data[0].id, { trial: data[0].trial + 1 });
      }
    }

    //if logged in within the limit
    const resetLogin = new LoginLogger();
    resetLogin.ipAddress = ipAddress;
    resetLogin.trial = 1;
    loggerRepo.save(resetLogin);
    return;
  } catch (error) {
    console.log("the error from the failed login attempt middleware is", error);
  }
}

//clearing failed login attempts
export async function clearFailedLoginAttempts(ipAddress) {
  try {
    const IPAddress = ipAddress;
    const data = await loggerRepo.find({
      where: {
        ipAddress: IPAddress,
      },
    });
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        await loggerRepo.remove(data[i]);
      }
    }
  } catch (error) {
    console.log("the error from the clearFailedLoginAttempts is", error);
  }
}
