import { Router } from "express";
import { validateRegister } from "../middlewares/validation.js";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/api/register", validateRegister, register);
router.post("/api/login", validateRegister, login);

export default router;
