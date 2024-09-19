import itemService from "../../../../services/item";
import { HttpStatusCode } from "axios";

export default async (req, res, next) => {
  try {
    const items = itemService.findAll();

    res.status(HttpStatusCode.Created).send({ success: true, payload: items });
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .send({ success: false, payload: error.message });
  }
};
