import { Document, Schema } from "mongoose";

export interface IMover extends Document {
  username: String;
  weight_limit: Number;
  energy: Number;
  state: String;
  item_carried?: Schema.Types.ObjectId | null;
  level: Number;
  is_deleted: Boolean;
}

export interface IItem extends Document {
  name: String;
  weight: Number;
  loading_time: {
    [key: string]: number;
  };
  is_deleted: Boolean;
}
