import eventService from "../../../../services/event";
import { HttpStatusCode } from "axios";

// don't use this function
// it is not correct
// its rightfull place is in src/http/controller/mover/updateState

export default async (req, res, next) => {
  try {
    const { state, magic_mover_id, magic_item_id } = req.body;
    const active = true;
    const start_date = new Date();
    let end_date: Date; // resting", "ready", "loading", "in mission", "mission done
    switch (state) {
      case "resting":
        end_date = new Date(start_date.getTime() + 2 * 60 * 60 * 1000);
        break;
      case "ready":
        end_date = new Date(start_date.getTime() + 2 * 60 * 60 * 1000);
        break;
      case "loading":
        end_date = new Date(start_date.getTime() + 2 * 60 * 60 * 1000);
        break;
      case "in mission":
        end_date = new Date(start_date.getTime() + 2 * 60 * 60 * 1000);
        break;
      default:
        end_date = new Date(start_date.getTime() + 2 * 60 * 60 * 1000);
        break;
    }

    const event = eventService.create({
      active,
      state,
      magic_mover_id,
      magic_item_id,
      start_date,
      end_date,
    });

    res.status(HttpStatusCode.Ok).send({ success: true, payload: event });
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).send({ success: false, payload: error.message });
  }
};
