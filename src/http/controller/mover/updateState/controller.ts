import moverService from "../../../../services/mover";
import { HttpStatusCode } from "axios";
import newMover from "../../../../utils/constants/mover";

export default async (req, res, next) => {
  try {
    const { id, newState } = req.body;
    const mover = moverService.updateState(id, newState)

    res.status(HttpStatusCode.Created).send({ success: true, payload: mover });
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .send({ success: false, payload: error.message });
  }
};
