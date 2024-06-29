// backend/routes/userRoutes.js
import express from "express";
import { register, login, getProfile } from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login" , login);
router.get('/Profile', getProfile);

export default router;
