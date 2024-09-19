import moverService from "../../../../services/mover";
import { HttpStatusCode } from "axios";
import newMover from "../../../../utils/constants/mover";

export default async (req, res, next) => {
  try {
    const movers = moverService.findAll();

    res.status(HttpStatusCode.Created).send({ success: true, payload: movers });
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .send({ success: false, payload: error.message });
  }
};
