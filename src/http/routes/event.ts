import express from "express";
import validator from "../middleware/validator"
import {GetAll, GetActive, GetMostCompleted} from "../controller/event/exports";
const router = express.Router();

// App routes
router.route("/").get(validator(GetAll.schema), GetAll.controller);
router.route("/active").get(validator(GetActive.schema), GetActive.controller);
router.route("/").post(validator(GetMostCompleted.schema), GetMostCompleted.controller);


export default router;