import express from "express";
import { login, logout, register, resetPassword } from "../controllers/loginController.js";
import { registerValidation } from "../middleware/validationMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", registerValidation, register);
router.get("/logout", logout);
router.post("/resetPassword", resetPassword);
export default router;
