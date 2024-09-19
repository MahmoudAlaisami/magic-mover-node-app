import moverService from "../../../../services/mover";
import { HttpStatusCode } from "axios";
import newMover from "../../../../utils/constants/mover";

export default async (req, res, next) => {
  try {
    const { username } = req.body;
    const defualtMoverData = newMover[1];
    const _mover = { ...defualtMoverData, username };
    const mover = moverService.create(_mover);

    res.status(HttpStatusCode.Created).send({ success: true, payload: mover });
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .send({ success: false, payload: error.message });
  }
};
