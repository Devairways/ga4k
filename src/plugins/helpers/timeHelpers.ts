import { FirebaseTimeStamp } from "../../apiServices/interface/index";

export const timestampToDate = (timestamp: FirebaseTimeStamp): string => {
  if (!timestamp) {
    return "";
  }
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000).toDateString();
};
