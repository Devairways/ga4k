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
      message: "Could not retrieve user data",
      type: "error"
    });
    console.warn(error);
  }
};

export const getAllUsers = async (pageLimit: number, lastestDoc?: Record<string, unknown>) => {
  try {
    const items = lastestDoc
      ? await usersCollection
          .orderBy("memberSince", "desc")
          .startAfter(lastestDoc)
          .limit(pageLimit)
          .get()
      : await usersCollection
          .orderBy("memberSince", "desc")
          .limit(pageLimit)
          .get();

    if (items) {
      return items;
    }
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not retrieve users",
      type: "error"
    });
    console.warn(error);
  }
};

export const updateUserData = async (userId: string, userData: UserData) => {
  try {
    await usersCollection.doc(userId).update(userData);
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not update user",
      type: "error"
    });
    console.warn(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await newsCollection.doc(id).delete();
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not delete user",
      type: "error"
    });
  }
};

export const getFounders = async (pageLimit: number) => {
  try {
    const items = await usersCollection
      .where("role", "==", "Founder")
      .limit(pageLimit)
      .get();

    if (items) {
      return items;
    }
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not retrieve users",
      type: "error"
    });
    console.warn(error);
  }
};
