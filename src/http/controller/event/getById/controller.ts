import eventService from "../../../../services/event";
import { HttpStatusCode } from "axios";

export default async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = eventService.findOneById(id);

    res.status(HttpStatusCode.Ok).send({ success: true, payload: event });
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .send({ success: false, payload: error.message });
  }
};
