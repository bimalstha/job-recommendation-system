import { Router } from "express";
import { adminController } from "../controllers/admin/adminController";


export const router = Router()

router.use('/',adminController)