import { NewsItem, NewsItemPost } from "@/apiServices/interface";
import { newsCollection } from "@/plugins/firebase";

export const getNewsItem = async (id: string) => {
  try {
    const item = await newsCollection.doc(id).get();
    return item.data() as NewsItem;
  } catch (error) {
    console.warn(error);
  }
};

export const getNewsItemList = async (pageLimit: number, lastestDoc?: Record<string, unknown>) => {
  try {
    const items = lastestDoc
      ? await newsCollection
          .orderBy("createdAt", "desc")
          .startAfter(lastestDoc)
          .limit(pageLimit)
          .get()
      : await newsCollection
          .orderBy("createdAt", "desc")
          .limit(pageLimit)
          .get();
    return items;
  } catch (error) {
    console.warn(error);
  }
};

export const updateNewsItem = async (itemId: string, newsItem: NewsItemPost) => {
  try {
    await newsCollection.doc(itemId).update(newsItem);
  } catch (error) {
    console.warn(error);
  }
};

export const deleteNewsItem = async (itemId: string) => {
  try {
    await newsCollection.doc(itemId).delete();
  } catch (error) {
    console.warn(error);
  }
};
