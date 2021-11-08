export interface NewsItem {
  id: string;
  body: string;
  createdAt: FirebaseTimeStamp;
  description: string;
  title: string;
  basePictureUrl?: string;
}

export interface FirebaseTimeStamp {
  nanoseconds: number;
  seconds: number;
}

export interface NewsItemPost {
  body: string;
  createdAt: Date;
  description: string;
  title: string;
  basePictureUrl?: string;
}
