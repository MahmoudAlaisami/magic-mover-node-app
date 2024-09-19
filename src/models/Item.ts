import { model, Schema, Model } from "mongoose";
import { IItem } from "../utils/types/models.t";

const ItemSchema: Schema<IItem> = new Schema({
  name: {
    type: String,
    required: [true, "name cannot be empty"],
  },
  weight: {
    type: Number,
    required: [true, "weight cannot be empty"],
  },
  loading_time: {
    type: Number,
    required: [true, "loading time cannot be empty"],
  },
  is_deleted: {
    type: Boolean,
    default: false,
    required: [true, "is_deleted state cannot be empty"],
  }
});

const Item: Model<IItem> = model("Item", ItemSchema);

export default Item;
