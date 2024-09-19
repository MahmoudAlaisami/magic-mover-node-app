import moverService from "../../../../services/mover";
import { HttpStatusCode } from "axios";
import newMover from "../../../../utils/constants/mover";

export default async (req, res, next) => {
  try {
    const { id, newItem } = req.body;
    const mover = await moverService.updateCarriedItem(id, newItem)

    res.status(HttpStatusCode.Ok).send({ success: true, payload: mover });
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .send({ success: false, payload: error.message });
  }
};
