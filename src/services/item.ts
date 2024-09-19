import Item from "../models/Item";
import { IItem } from "../utils/types/models.t";

const itemService = {
  findAll: async (): Promise<IItem[]> => {
    try {
      return await Item.find({ is_deleted: false });
    } catch (error) {
      throw new Error(`fetching all Items failed: ${error.message}`);
    }
  },

  findOneById: async (id: string): Promise<IItem> => {
    try {
      const item = await Item.findOne({ _id: id, is_deleted: false });
      if (!item) {
        throw new Error("Item not found");
      }
      return item;
    } catch (error) {
      throw new Error(`Failed to find Item: ${error.message}`);
    }
  },

  create: async (data: Partial<IItem>): Promise<IItem> => {
    try {
      const item = await Item.create(data);
      return item;
    } catch (error: any) {
      throw new Error(`Failed to create Item: ${error.message}`);
    }
  },

  edit: async (id: string, name: string, weight: number, loading_time): Promise<IItem> => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        id,
        {
          name,
          weight,
          loading_time,
        },
        { new: true },
      );
      if (!updatedItem) throw new Error("Something went wrong");

      return updatedItem;
    } catch (error) {
      throw new Error(`Failed to update Item: ${error.message}`);
    }
  },

  softDelete: async (id: string): Promise<IItem> => {
    try {
      const item = await Item.findByIdAndUpdate(
        id,
        {
          is_deleted: true,
        },
        { new: true },
      );
      if (!item) throw new Error("Something went wrong");

      return item;
    } catch (error) {
      throw new Error(`soft delete failed: ${error.message}`);
    }
  },

  restore: async (id: string): Promise<IItem> => {
    try {
      const item = await Item.findByIdAndUpdate(
        id,
        {
          is_deleted: false,
        },
        { new: true },
      );
      if (!item) throw new Error("Something went wrong");

      return item;
    } catch (error) {
      throw new Error(`restore failed: ${error.message}`);
    }
  },
};

export default itemService;
