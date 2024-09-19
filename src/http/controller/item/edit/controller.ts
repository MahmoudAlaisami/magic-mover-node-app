import itemService from "../../../../services/item";
import { HttpStatusCode } from "axios";

export default async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, weight, loading_time } = req.body;
    const item = await itemService.edit(id, name, weight, loading_time);

    res.status(HttpStatusCode.Ok).send({ success: true, payload: item });
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).send({ success: false, payload: error.message });
  }
};
