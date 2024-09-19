import moverService from "../../../../services/mover";
import eventService from "../../../../services/event";
import itemService from "../../../../services/item";
import { HttpStatusCode } from "axios";
import { getEndDate } from "../../../../utils/helper";
import newMover from "../../../../utils/constants/mover";
import { addMilliseconds } from "date-fns";

export default async (req, res, next) => {
  try {
    const { id, newState, magic_item_id } = req.body;

    const mover = await moverService.findOneById(id);
    const closedState = await eventService.closeEvent(mover.state);

    let endDate: number | undefined;
    if (magic_item_id) {
      const { loading_time } = await itemService.findOneById(magic_item_id);
      endDate = getEndDate(newState, loading_time);
    } else {
      endDate = getEndDate(newState);
    }
    console.log('.... endDate',endDate);

    const event = await eventService.create({
      active: true,
      state: newState,
      magic_mover_id: id,
      magic_item_id,
      start_date: new Date(),
      end_date: endDate !== 0 ? addMilliseconds(new Date(), endDate) : undefined,
    });

    const updatedMover = await moverService.updateState(mover, event._id.toString())

    res.status(HttpStatusCode.Ok).send({ success: true, payload: { updatedMover, event } });
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).send({ success: false, payload: error.message });
  }
};
