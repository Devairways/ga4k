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

export const submitContactForm = async (name: string, email: string, msg: string) => {
  try {
    const res = await fetch("https://formsubmit.co/ajax/01b0629fe5fd1fbfa97556e706263a0f", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        Naam: name,
        Email: email,
        Bericht: msg
      })
    });
    const responseObj = await res.json();

    if (responseObj.success.includes("true")) {
      return true;
    }
    return false;
  } catch (error) {
    ElNotification({
      title: "Failed",
      message: "Could not send message",
      type: "error"
    });
    console.warn(error);
  }
};
