import moverService from "../../../../services/mover";
import { HttpStatusCode } from "axios";
import newMover from "../../../../utils/constants/mover";

export default async (req, res, next) => {
  try {
    const { level } = req.params;
    const movers = await moverService.findByLevel(level);

    res.status(HttpStatusCode.Ok).send({ success: true, payload: movers });
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .send({ success: false, payload: error.message });
  }
};
