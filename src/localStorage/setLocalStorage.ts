import { Activity, Nippo, Tag, TagTime } from "../type/user";
import {
  getActivityKeyList,
  getUserKeyList,
  getNippoKeyList,
  getTagKeyList,
  getTagTimeKeyList,
} from "./keyList";

/**
 * tagを作成・更新
 * @param tag
 */
export function setTag(tag: Tag): void {
  const keys = getTagKeyList(tag.id);
  localStorage.setItem(keys.title, tag.title);

  const timeCountIds = [] as string[];
  tag.timeCount.forEach((el) => {
    timeCountIds.push(String(el.id));
  });
  localStorage.setItem(keys.timeCount, timeCountIds.join("-"));
  localStorage.setItem(keys.createDate, String(tag.createDate));
}

/**
 * currentTagIdを更新
 * @param number
 */
export function setNextTagId(id: number): void {
  const currentIdKeyList = getUserKeyList();
  localStorage.setItem(currentIdKeyList.nextTagId, String(id));
}

/**
 * activityを作成・更新
 * @param activity
 */
export function setActivity(activity: Activity): void {
  const keys = getActivityKeyList(activity.id);
  localStorage.setItem(keys.title, String(activity.title));
  localStorage.setItem(keys.tag, String(activity.tag.id));
  localStorage.setItem(keys.startTime, String(activity.startTime));
  localStorage.setItem(keys.endTime, String(activity.endTime));
}

/**
 * nextActivityIdを更新
 * @param id
 */
export function setNextActivityId(id: number): void {
  const currentIdKeyList = getUserKeyList();
  localStorage.setItem(currentIdKeyList.nextActivityId, String(id));
}

/**
 * nippoを作成・更新
 * @param nippo
 */
export function setNippo(nippo: Nippo): void {
  const keys = getNippoKeyList(nippo.id);
  console.log("activities length");
  console.log(nippo.activities.length);
  console.log("in setNippo");
  console.log(nippo);
  localStorage.setItem(keys.date, String(nippo.date));
  localStorage.setItem(
    keys.activities,
    nippo.activities.map((activity) => String(activity.id)).join("-")
  );
}

/**
 * nextNippoIdを更新
 * @param id
 */
export function setNextNippoId(id: number): void {
  const currentIdKeyList = getUserKeyList();
  localStorage.setItem(currentIdKeyList.nextNippoId, String(id));
}

export function setTagTime(tagTime: TagTime): void {
  const keys = getTagTimeKeyList(tagTime.id);
  localStorage.setItem(keys.date, String(tagTime.date));
  localStorage.setItem(keys.timeCount, String(tagTime.timeCount));
}

export function setNextTagTimeId(id: number): void {
  const currentIdKeyList = getUserKeyList();
  localStorage.setItem(currentIdKeyList.nextTagTimeId, String(id));
}
