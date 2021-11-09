import { EventItem, EventItemPost } from "@/apiServices/interface";
import { eventsCollection } from "@/plugins/firebase";
import { ElNotification } from "element-plus";

export const getEventItem = async (id: string) => {
  try {
    const item = await eventsCollection.doc(id).get();
    return item.data() as EventItem;
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not retrieve event data",
      type: "error"
    });
    console.warn(error);
  }
};

export const getEventItemList = async (pageLimit: number, lastestDoc?: Record<string, unknown>) => {
  try {
    const items = lastestDoc
      ? await eventsCollection
          .orderBy("createdAt", "desc")
          .startAfter(lastestDoc)
          .limit(pageLimit)
          .get()
      : await eventsCollection
          .orderBy("createdAt", "desc")
          .limit(pageLimit)
          .get();
    return items;
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not retrieve event data",
      type: "error"
    });
    console.warn(error);
  }
};

export const getSpecifiedMonthEvents = async (month: string) => {
  try {
    console.log("latest doc: ", month);

    const eventItems = await eventsCollection
      .where("eventDate", ">", new Date(`${month} 01`))
      .where("eventDate", "<", new Date(`${month} 31`))
      .get();

    if (eventItems) {
      return eventItems;
    }
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not retrieve event data",
      type: "error"
    });
    console.warn(error);
  }
};

export const updateEventItem = async (itemId: string, eventItem: EventItemPost) => {
  try {
    await eventsCollection.doc(itemId).update(eventItem);
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not update event",
      type: "error"
    });
    console.warn(error);
  }
};

export const deleteEventItem = async (itemId: string) => {
  try {
    await eventsCollection.doc(itemId).delete();
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not delete event",
      type: "error"
    });
    console.warn(error);
  }
};
