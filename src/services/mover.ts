import Mover from "../models/Mover";
import { IMover } from "../utils/types/models.t";
import newMover from "../utils/constants/mover";

const moverService = {
  findAll: async (): Promise<IMover[]> => {
    try {
      return await Mover.find({ is_deleted: false });
    } catch (error) {
      throw new Error(`fetching all Movers failed: ${error.message}`);
    }
  },

  findOneById: async (id: string): Promise<IMover> => {
    try {
      const mover = await Mover.findOne({ _id: id, is_deleted: false });
      if (!mover) {
        throw new Error("Mover not found");
      }
      return mover;
    } catch (error) {
      throw new Error(`Failed to find Mover: ${error.message}`);
    }
  },

  findByLevel: async (level: Number): Promise<IMover[]> => {
    try {
      const movers = await Mover.find({ level });
      if (!movers.length) {
        throw new Error(`No Movers found`);
      }
      return movers;
    } catch (error) {
      throw new Error(`Failed to get Movers: ${error.message}`);
    }
  },

  create: async (data: Partial<IMover>): Promise<IMover> => {
    try {
      const mover = await Mover.create(data);
      return mover;
    } catch (error: any) {
      throw new Error(`Failed to create Mover: ${error.message}`);
    }
  },

  updateState: async (id: string, newState: string): Promise<IMover> => {
    try {
      const mover = await Mover.findOne({ _id: id, is_deleted: false });
      if (!mover) throw new Error("Invalid Mover");

      const { state, ..._mover } = mover;
      const updatedMover = await Mover.findByIdAndUpdate(
        id,
        {
          ..._mover,
          state: newState,
        },
        { new: true }
      );
      if (!updatedMover) throw new Error("Something went wrong");

      return updatedMover;
    } catch (error) {
      throw new Error(`Failed to update state: ${error.message}`);
    }
  },

  updateCarriedItem: async (id: string, newItem: string): Promise<IMover> => {
    try {
      const mover = await Mover.findOne({ _id: id, is_deleted: false });
      if (!mover) throw new Error("Invalid Mover");

      const { item_carried, ..._mover } = mover;
      const updatedMover = await Mover.findByIdAndUpdate(
        id,
        {
          ..._mover,
          item: newItem,
        },
        { new: true }
      );
      if (!updatedMover) throw new Error("Something went wrong");

      return updatedMover;
    } catch (error) {
      throw new Error(`Failed to update Carried Item: ${error.message}`);
    }
  },

  upgrade: async (id: string): Promise<IMover> => {
    try {
      const mover = await Mover.findOne({ _id: id, is_deleted: false });
      if (!mover) throw new Error("Invalid Mover");

      const { level, ..._mover } = mover;
      if (level == 10) throw new Error(`${mover.username} is at max level`);

      const nextLevel: number = +level + 1;
      const newSats = newMover[nextLevel];
      const { weight_limit, energy } = newSats;

      const updatedMover = await Mover.findByIdAndUpdate(
        id,
        {
          username: mover.username,
          weight_limit,
          energy,
          state: mover.state,
          item_carried: mover.item_carried,
          level: nextLevel,
          is_deleted: false,
        },
        { new: true }
      );
      if (!updatedMover) throw new Error("Something went wrong");

      return updatedMover;
    } catch (error) {
      throw new Error(`Failed to update state: ${error.message}`);
    }
  },

  downgrade: async (id: string): Promise<IMover> => {
    try {
      const mover = await Mover.findOne({ _id: id, is_deleted: false });
      if (!mover) throw new Error("Invalid Mover");

      const { level, ..._mover } = mover;
      if (level == 1) throw new Error(`${mover.username} is at minimun level`);

      const previousLevel: number = +level - 1;
      const newSats = newMover[previousLevel];
      const { weight_limit, energy } = newSats;

      const updatedMover = await Mover.findByIdAndUpdate(
        id,
        {
          username: mover.username,
          weight_limit,
          energy,
          state: mover.state,
          item_carried: mover.item_carried,
          level: previousLevel,
          is_deleted: false,
        },
        { new: true }
      );
      if (!updatedMover) throw new Error("Something went wrong");

      return updatedMover;
    } catch (error) {
      throw new Error(`Failed to update state: ${error.message}`);
    }
  },

  softDelete: async (id: string): Promise<IMover> => {
    try {
      const mover = await Mover.findByIdAndUpdate(
        id,
        {
          is_deleted: true,
        },
        { new: true }
      );
      if (!mover) throw new Error("Something went wrong");

      return mover;
    } catch (error) {
      throw new Error(`soft delete failed: ${error.message}`);
    }
  },

  restore: async (id: string): Promise<IMover> => {
    try {
      const mover = await Mover.findByIdAndUpdate(
        id,
        {
          is_deleted: false,
        },
        { new: true }
      );
      if (!mover) throw new Error("Something went wrong");

      return mover;
    } catch (error) {
      throw new Error(`restore failed: ${error.message}`);
    }
  },
};

export default moverService;
