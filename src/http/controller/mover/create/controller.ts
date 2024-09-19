import moverService from "../../../../services/mover";
import eventService from "../../../../services/event";
import { ObjectIdConstructor } from "../../../../utils/types/idConstructor";
import { ObjectId, Schema, Types } from "mongoose";
import { HttpStatusCode } from "axios";
import newMover from "../../../../utils/constants/mover";
import { pick, omit } from "lodash";
import { IMover } from "../../../../utils/types/models.t";

export default async (req, res, next) => {
  try {
    const { username } = req.body;
    const defualtMoverData = newMover[1];
    const _mover = { ...defualtMoverData, username };
    const mover = await moverService.create(_mover);

    const event = await eventService.create({
      active: true,
      state: "ready",
      magic_mover_id: mover._id.toString(), // there is a bug when using mover._id see the bottom of the page
      magic_item_id: null,
      start_date: new Date(),
      end_date: null,
    });
    console.log('.... event',event);
    const moverId = mover._id.toString()
    const moverWithStatus = await moverService.updateState(mover, event._id.toString());

    res.status(HttpStatusCode.Ok).send({ success: true, payload: { moverWithStatus, event } });
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).send({ success: false, payload: error.message });
  }
};

// ISSUE
// typescript is not taking mover._id as an ObjectId in BSON format
// although the _id is auto generated
// I will manipulate the type of magic_mover_id to be ObjectId or string
// issue link:
// https://github.com/Automattic/mongoose/issues/12537
// time wasted: 5 hrs