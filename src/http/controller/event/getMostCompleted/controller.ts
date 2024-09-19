import eventService from "../../../../services/event";
import { HttpStatusCode } from "axios";

export default async (req, res, next) => {
  try {
    const { listNum } = req.params;
    const mover = eventService.findMostCompleted(listNum);

    res.status(HttpStatusCode.Ok).send({ success: true, payload: mover });
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).send({ success: false, payload: error.message });
  }
};
