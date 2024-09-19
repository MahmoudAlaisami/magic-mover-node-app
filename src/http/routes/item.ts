import express from "express";
import validator from "../middleware/validator"
import {GetAll, GetById, Create, Edit, SoftDelete, Restore} from "../controller/item/exports";
const router = express.Router();

// App routes
router.route("/").get(validator(GetAll.schema), GetAll.controller);
router.route("/:id").get(validator(GetById.schema), GetById.controller);

router.route("/").post(validator(Create.schema), Create.controller);
router.route("/:id").put(validator(Edit.schema), Edit.controller);

router.route("/").delete(validator(SoftDelete.schema), SoftDelete.controller)
router.route("/:id").post(validator(Restore.schema), Restore.controller)

export default router;