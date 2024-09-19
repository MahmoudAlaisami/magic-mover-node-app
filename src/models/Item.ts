import { model, Schema, Model } from "mongoose";
import { IItem } from "../utils/types/models.t";

const ItemSchema: Schema<IItem> = new Schema({
  name: {
    type: String,
  },
  weight: {
    type: Number,
  },
  loading_time: {
    type: Map,
    of: Number
  },
  is_deleted: {
    type: Boolean,
    default: false
  }
});

const Item: Model<IItem> = model("Item", ItemSchema);

export default Item;
