import express from "express";
import validator from "../middleware/validator"
import {GetAll, GetetByLevel, GetById, Create, UpdateState, UpdateCarriedItem,
  Upgrade, Downgrade, SoftDelete, Restore} from "../controller/mover/exports";
const router = express.Router();

// App routes
router.route("/getAll").get(validator(GetAll.schema), GetAll.controller);
router.route("/getByLevel/:level").get(validator(GetetByLevel.schema), GetetByLevel.controller);
router.route("/getById/:id").get(validator(GetById.schema), GetById.controller);

router.route("/create").post(validator(Create.schema), Create.controller);

router.route("/update/state").put(validator(UpdateState.schema), UpdateState.controller);
router.route("/update/item").put(validator(UpdateCarriedItem.schema), UpdateCarriedItem.controller);

router.route("/upgrade").put(validator(Upgrade.schema), Upgrade.controller)
router.route("/downgrade").put(validator(Downgrade.schema), Downgrade.controller)

router.route("/delete").delete(validator(SoftDelete.schema), SoftDelete.controller)
router.route("/restore/:id").post(validator(Restore.schema), Restore.controller)

export default router;


