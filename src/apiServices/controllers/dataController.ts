import { dataCollection } from "@/plugins/firebase";
import { ElNotification } from "element-plus";

export const getData = async (id: string) => {
  try {
    const item = await dataCollection.doc(id).get();
    if (item) {
      return item;
    }
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not retrieve data",
      type: "error"
    });
    console.warn(error);
  }
};

export const getAchievementsData = async () => {
  try {
    const main_achievements = await dataCollection.doc("main_achievements").get();
    if (main_achievements) {
      return main_achievements;
    }
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not retrieve achievement data",
      type: "error"
    });
    console.warn(error);
  }
};

export const updateAchievementData = async (field: string, updatedValue: number) => {
  try {
    await dataCollection.doc("main_achievements").update({ [field]: updatedValue });
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not update data",
      type: "error"
    });
    console.warn(error);
  }
};
