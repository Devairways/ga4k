import { FileHandler } from "element-plus/lib/components/upload/src/upload.type";
import { PropType } from "vue-demi";
import { FirebaseTimeStamp } from ".";

export interface EventItem {
  id: string;
  body: string;
  createdAt: FirebaseTimeStamp;
  eventDate: FirebaseTimeStamp;
  description: string;
  title: string;
  basePictureUrl?: string;
}

export interface EventItemPost {
  body: string;
  createdAt: Date;
  eventDate: Date;
  description: string;
  title: string;
  basePictureUrl?: string;
}

export type PFileHandler<T> = PropType<FileHandler<T>>;
