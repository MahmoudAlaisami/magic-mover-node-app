import { model, Schema, Model } from "mongoose";
import { ItemInterface } from "../utils/types/models.t";
import { Mode } from "fs";

const ItemSchema: Schema<ItemInterface> = new Schema({
  name: {
    type: String,
  },
  weight: {
    type: Number,
  },
  loadingTime: {
    type: Map,
    of: Number
  },
});

const Item: Model<ItemInterface> = model("Item", ItemSchema);

export default Item;
