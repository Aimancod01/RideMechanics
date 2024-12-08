import express from "express";
import { getAllUsers, login, logout, register, resetPassword } from "../controllers/loginController.js";
import { registerValidation } from "../middleware/validationMiddleware.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", upload.single("image"), register);
router.get("/logout", logout);
router.post("/resetPassword", resetPassword);
router.get("/getUsers", getAllUsers);
export default router;
