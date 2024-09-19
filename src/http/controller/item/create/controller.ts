import itemService from "../../../../services/item";
import { HttpStatusCode } from "axios";

export default async (req, res, next) => {
  try {
    const { name, weight, loading_time } = req.body;
    const is_deleted = false;
    const item = await itemService.create({ name, weight, loading_time, is_deleted });

    res.status(HttpStatusCode.Ok).send({ success: true, payload: item });
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .send({ success: false, payload: error.message });
  }
};