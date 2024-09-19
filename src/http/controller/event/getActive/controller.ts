import eventService from "../../../../services/event";
import { HttpStatusCode } from "axios";

export default async (req, res, next) => {
  try {
    const events = eventService.findActive()

    res.status(HttpStatusCode.Ok).send({ success: true, payload: events });
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .send({ success: false, payload: error.message });
  }
};
