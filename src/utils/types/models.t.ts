import { Document, Schema } from "mongoose";

export interface IMover extends Document {
  weight_limit: Number;
  energy: Number;
  state: String;
  item_carried: Schema.Types.ObjectId;
  level: Number;
  is_deleted: Boolean;
}

export interface IItem extends Document {
  name: String;
  weight: Number;
  loadingTime: {
    [key: string]: number;
  };
  is_deleted: Boolean;
}
