import { Document, Schema } from "mongoose";

export interface MoverInterface extends Document {
  weight_limit: Number;
  energy: Number;
  state: String;
  item_carried: Schema.Types.ObjectId;
  level: Number;
}

export interface ItemInterface extends Document {
  name: String;
  weight: Number;
  loadingTime: {
    [key: string]: number;
  };
}
