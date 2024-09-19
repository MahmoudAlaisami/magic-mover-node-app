import itemService from "../../../../services/item";
import { HttpStatusCode } from "axios";

export default async (req, res, next) => {
  try {
    const { name, weight, loading_time } = req.body;
    const is_deleted = false;
    const item = itemService.create({ name, weight, loading_time, is_deleted });

    res.status(HttpStatusCode.Created).send({ success: true, payload: item });
  } catch (error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .send({ success: false, payload: error.message });
  }
};