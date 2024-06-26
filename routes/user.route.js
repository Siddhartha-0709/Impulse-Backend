import { Router } from "express";
import { createUser, findDriverNear, loginUser, requestDriver } from "../controllers/user.controller.js";

const router = Router();
router.route('/signup').post(createUser);
router.route('/login').post(loginUser);
router.route('/findneardriver').post(findDriverNear);
router.route('/requestdriver').post(requestDriver);

export default router;