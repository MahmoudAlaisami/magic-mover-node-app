import { Document, Schema } from "mongoose";

export interface IMover extends Document {
  username: string;
  weight_limit: number;
  energy: number;
  state: string;
  item_carried?: Schema.Types.ObjectId | null;
  level: number;
  is_deleted: Boolean;
}

export interface IItem extends Document {
  name: string;
  weight: number;
  loading_time: {
    [key: string]: number;
  };
  is_deleted: Boolean;
}

export interface IEvent extends Document {
  active: boolean;
  state: string;
  magic_mover_id: Schema.Types.ObjectId;
  magic_item_id: Schema.Types.ObjectId;
  start_date: Date;
  end_date: Date;
}