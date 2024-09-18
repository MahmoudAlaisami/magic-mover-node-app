import { model, Schema, Model } from "mongoose";
import { IMover } from "../utils/types/models.t";

const MoverSchema: Schema<IMover> = new Schema({
  weight_limit: {
    type: Number,
    required: [true, "weight limit cannot be empty"],
  },
  energy: {
    type: Number,
    required: [true, "energy cannot be empty"],
  },
  state: {
    type: String,
    enum: ["resting", "loading", "in mission", "mission done"],
    required: [true, "state cannot be empty"],
  },
  item_carried: {
    type: Schema.Types.ObjectId,
    ref: "item",
  },
  level: {
    type: Number,
    required: [true, "level cannot be empty"],
    default: 1,
  },
  is_deleted: {
    type: Boolean,
    default: false
  }
});

const Mover: Model<IMover> = model("Mover", MoverSchema);

export default Mover;
