import dayjs from "dayjs";
import { Activity, Nippo, Tag, TagTime, User } from "../type/user";
import {
  getActivityKeyList,
  getNippoKeyList,
  getTagKeyList,
  getTagTimeKeyList,
  getUserKeyList,
} from "./keyList";

/**
 * primitiveなget
 * @param id
 * @returns Activity
 */
export function getActivitySingle(id: number): Activity {
  const keys = getActivityKeyList(id);
  const title = localStorage.getItem(keys.title);
  const tagid = localStorage.getItem(keys.tag);
  const startTime = localStorage.getItem(keys.startTime);
  const endTime = localStorage.getItem(keys.endTime);
  return {
    id: id,
    title: title || "",
    tag: getTagSingle(Number(tagid)),
    startTime: dayjs(startTime || ""),
    endTime: dayjs(endTime || ""),
  };
}

/**
 * primitiveなget
 * @param id
 * @returns Tag
 */
export function getTagSingle(id: number): Tag {
  const keys = getTagKeyList(id);
  const title = localStorage.getItem(keys.title);
  const createDate = localStorage.getItem(keys.createDate);
  const timeCounts = localStorage.getItem(keys.timeCount);

  let tagTimes = [] as TagTime[];
  if (timeCounts) {
    tagTimes = timeCounts.split("-").map((id) => getTagTimeSingle(Number(id)));
  }
  return {
    id: id,
    title: title || "",
    timeCount: tagTimes,
    createDate: dayjs(createDate || ""),
  };
}
/**
 * primitiveなget
 * @param id
 * @returns Nippo
 */
export function getNippoSingle(id: number): Nippo {
  const keys = getNippoKeyList(id);
  const date = localStorage.getItem(keys.date);
  const activities = localStorage.getItem(keys.activities);
  const activityIds: number[] | undefined = activities
    ?.split("-")
    .map((el) => Number(el || ""));
  return {
    id: id,
    date: dayjs(date || ""),
    activities:
      activityIds?.map((el) => getActivitySingle(el)) || ([] as Activity[]),
  };
}

/**
 * primitiveなget
 * @returns User
 */
export function getUser(): User {
  const keys = getUserKeyList();
  const nextActivityId = localStorage.getItem(keys.nextActivityId);
  const nextNippoId = localStorage.getItem(keys.nextNippoId);
  const nextTagId = localStorage.getItem(keys.nextTagId);
  const nextTagTimeId = localStorage.getItem(keys.nextTagTimeId);
  return {
    nextActivityId: Number(nextActivityId),
    nextNippoId: Number(nextNippoId),
    nextTagId: Number(nextTagId),
    nextTagTimeId: Number(nextTagTimeId),
  };
}

/**
 * primitiveなget
 * @param id
 * @returns TagTime
 */
export function getTagTimeSingle(id: number): TagTime {
  const keys = getTagTimeKeyList(id);
  const date = localStorage.getItem(keys.date);
  const timeCount = localStorage.getItem(keys.timeCount);
  return {
    id: id,
    date: dayjs(date || ""),
    timeCount: Number(timeCount),
  };
}
