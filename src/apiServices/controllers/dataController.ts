import { dataCollection } from "@/plugins/firebase";

export const getData = async (id: string) => {
  try {
    const item = await dataCollection.doc(id).get();
    if (item) {
      return item;
    }
  } catch (error) {
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
    console.warn(error);
  }
};

export const updateAchievementData = async (field: string, updatedValue: number) => {
  try {
    await dataCollection.doc("main_achievements").update({ [field]: updatedValue });
  } catch (error) {
    console.warn(error);
  }
};
