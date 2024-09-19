import express from "express";
import validator from "../middleware/validator"
import {GetAll, GetetByLevel, GetById, Create, Update,
  Upgrade, Downgrade, SoftDelete, Restore} from "../controller/mover/exports";
const router = express.Router();

// App routes
router.route("/").get(validator(GetAll.schema), GetAll.controller);
router.route("/:id").get(validator(GetById.schema), GetById.controller);
router.route("/get-by-level/:level").get(validator(GetetByLevel.schema), GetetByLevel.controller);

router.route("/").post(validator(Create.schema), Create.controller);
router.route("/").put(validator(Update.schema), Update.controller);

router.route("/level/upgrade").put(validator(Upgrade.schema), Upgrade.controller)
router.route("/level/downgrade").put(validator(Downgrade.schema), Downgrade.controller)

router.route("/").delete(validator(SoftDelete.schema), SoftDelete.controller)
router.route("/:id").post(validator(Restore.schema), Restore.controller)

export default router;