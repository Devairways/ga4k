import { NewsItemPost } from "@/apiServices/interface";
import { newsCollection } from "@/plugins/firebase";

export const getNewsItem = async (id: string) => {
  try {
    const item = await newsCollection.doc(id).get();
    if (item) {
      return item;
    }
  } catch (error) {
    console.warn(error);
  }
};

export const getNewsItemList = async (pageLimit: number, lastestDoc?: Record<string, unknown>) => {
  try {
    const items = await newsCollection
      .orderBy("createdAt", "desc")
      .startAfter(lastestDoc)
      .limit(pageLimit)
      .get();
    return items;
  } catch (error) {
    console.warn(error);
  }
};

export const updateNewsItem = async (itemId: string, newsItem: NewsItemPost) => {
  await newsCollection.doc(itemId).update(newsItem);
};

export const deleteNewsItem = async (id: string) => {
  await newsCollection.doc(id).delete();
};
