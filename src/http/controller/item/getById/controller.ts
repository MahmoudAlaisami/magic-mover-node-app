import itemService from "../../../../services/item";
import { HttpStatusCode } from "axios";

export default async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = itemService.findOneById(id);

    res.status(HttpStatusCode.Created).send({ success: true, payload: item });
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .send({ success: false, payload: error.message });
  }
};
