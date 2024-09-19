import itemService from "../../../../services/item";
import { HttpStatusCode } from "axios";

export default async (req, res, next) => {
  try {
    const { id } = req.body;
    const item = itemService.softDelete(id);

    res.status(HttpStatusCode.Created).send({ success: true, payload: item });
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .send({ success: false, payload: error.message });
  }
};
