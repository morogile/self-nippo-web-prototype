/* export type User = {
  id: number;
  username: string;
  nippos: Nippo[];
}; */

import { Dayjs } from "dayjs";

export type Nippo = {
  id: number;
  date: Dayjs;
  activities: Activity[];
};

export type Activity = {
  id: number;
  title: string;
  tag: Tag; //ここを複数にするかは設計によりそう
  startTime: Dayjs;
  endTime: Dayjs;
};

export type Tag = {
  id: number;
  title: string;
  timeCount: TagTime[];
  createDate: Dayjs;
};

export type TagTime = {
  id: number;
  date: Dayjs;
  timeCount: number;
};

export type User = {
  nextTagId: number;
  nextTagTimeId: number;
  nextActivityId: number;
  nextNippoId: number;
};
