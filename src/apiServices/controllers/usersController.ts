import { UserData } from "@/apiServices/interface";
import { newsCollection, usersCollection } from "@/plugins/firebase";
import { ElNotification } from "element-plus";

export const getUserData = async (id: string) => {
  try {
    const item = await usersCollection.doc(id).get();
    if (item) {
      return item;
    }
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not retrieve profile",
      type: "error"
    });
    console.warn(error);
  }
};

export const getAllUsers = async (pageLimit: number, lastestDoc?: Record<string, unknown>) => {
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

export const updateUserData = async (userId: string, userData: UserData) => {
  try {
    await usersCollection.doc(userId).update(userData);
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not update profile",
      type: "error"
    });
    console.warn(error);
  }
};

export const deleteUser = async (id: string) => {
  await newsCollection.doc(id).delete();
};
