import { Document, Schema } from "mongoose";

export interface IMover extends Document {
  username: string;
  weight_limit: number;
  energy: number;
  state: Schema.Types.ObjectId | null;
  item_carried?: Schema.Types.ObjectId | null;
  level: number;
  is_deleted: Boolean;
}

export interface IItem extends Document {
  name: string;
  weight: number;
  loading_time: number;
  // {
  //   [key: string]: number;
  // };
  is_deleted: Boolean;
}

export interface IEvent extends Document {
  active: boolean;
  state: string;
  magic_mover_id: Schema.Types.ObjectId | string; // I added string due to an open issue (see bottom page)
  magic_item_id: Schema.Types.ObjectId | null;
  start_date: Date;
  end_date: Date | undefined;
}

// for refrence see the issue where it originated in
// src/http/controller/mover/create/controller.ts