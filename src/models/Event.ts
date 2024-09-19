import { model, Schema, Model } from "mongoose";
import { IEvent } from "../utils/types/models.t";

const EventSchema: Schema<IEvent> = new Schema({
  active: {
    type: Boolean,
    default: true,
    required: [true, "active state cannot be empty"],
  },
  state: {
    type: String,
    enum: ["resting", "ready", "loading", "in mission", "mission done"],
    required: [true, "state cannot be empty"],
  },
  magic_mover_id: {
    type: Schema.Types.ObjectId,
    ref: "Mover",
    required: [true, "magic mover id cannot be empty"],
  },
  magic_item_id: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    // required: [true, "magic item id cannot be empty"],
  },
  start_date: {
    type: Date,
    required: [true, "start date cannot be empty"],
  },
  end_date: {
    type: Date,
    // required: [true, "end date cannot be empty"],
  }
});

const Event: Model<IEvent> = model("Event", EventSchema);

export default Event;
