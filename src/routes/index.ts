import { Router } from "express";
import { adminController } from "../controllers/admin/adminController";
import { employerController } from "../controllers/employer/employerController";
import { seekerController } from "../controllers/seeker/seekerController";
import { vacancyController } from "../controllers/jobVacancy/vacancyController";

export const router = Router();

router.use("/", adminController);
router.use("/", employerController);
router.use("/", seekerController);
router.use("/",vacancyController)