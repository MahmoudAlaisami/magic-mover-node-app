import Event from "../models/Event";
import Mover from "../models/Mover";
import { IEvent, IMover } from "../utils/types/models.t";
import { Schema } from "mongoose";

const eventService = {
  findAll: async (): Promise<IEvent[]> => {
    try {
      return await Event.find({});
    } catch (error) {
      throw new Error(`fetching all Events failed: ${error.message}`);
    }
  },

  findActive: async (): Promise<IEvent[]> => {
    try {
      const events = await Event.find({ active: true });
      if (!events) {
        throw new Error("Events not found");
      }
      return events;
    } catch (error) {
      throw new Error(`Failed to find Active Events: ${error.message}`);
    }
  },

  findMostCompleted: async (listNum: number) => {
    try {
      const result = await Event.aggregate([
        {
          $match: {
            state: "mission done",
          },
        },
        {
          $group: {
            _id: "$magic_mover_id",
            completedCount: { $sum: 1 },
          },
        },
        {
          $sort: {
            completedCount: -1,
          },
        },
        {
          $limit: listNum,
        },
      ]);

      if (result.length > 0) {
        const moverId = result[0]._id;
        const mover = await Mover.findById(moverId).exec();
        return { mover, completedCount: result[0].completedCount };
      }

      return null;
    } catch (error) {
      throw new Error(`Failed to find Mover with most completed events: ${error.message}`);
    }
  },

  create: async (data: Partial<IEvent>): Promise<IEvent> => {
    try {
      // console.log('.... create .. event .. data',data);
      const event = await Event.create(data);
      return event;
    } catch (error: any) {
      throw new Error(`Failed to create Event: ${error.message}`);
    }
  },

  closeEvent: async (id: Schema.Types.ObjectId): Promise<IEvent> => {
    try {
      console.log(".... ", id);
      const event = await Event.findOne({ _id: id });
      console.log(".... ", { event });
      let updatedEvent: IEvent | null;
      if (!event?.end_date) {
        updatedEvent = await Event.findByIdAndUpdate(
          id,
          {
            active: false,
            end_date: new Date(),
          },
          { new: true },
        );
      } else {
        updatedEvent = await Event.findByIdAndUpdate(
          id,
          {
            active: false,
          },
          { new: true },
        );
      }

      if (!updatedEvent) throw new Error("Something went wrong");

      console.log(".... updatedEvent", updatedEvent);
      return updatedEvent;
    } catch (error) {
      throw new Error(`Ending Event failed: ${error.message}`);
    }
  },

  // edit: async (id: string, data: []): Promise<IEvent> => {
  //   try {
  //     const updatedEvent = await Event.findByIdAndUpdate(
  //       id,
  //       {
  //         ...data,
  //       },
  //       { new: true },
  //     );
  //     if (!updatedEvent) throw new Error("Something went wrong");

  //     return updatedEvent;
  //   } catch (error) {
  //     throw new Error(`Failed to update Event: ${error.message}`);
  //   }
  // },
};

export default eventService;
