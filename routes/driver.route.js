import { Router } from "express";
import { createDriver, loginDriver, sendLocation } from "../controllers/driver.controller.js";

const router = Router();

router.route('/signup').post(createDriver);
router.route('/login').post(loginDriver);
router.route('/sendlocation').post(sendLocation);
export default router