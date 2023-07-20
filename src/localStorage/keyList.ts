import { Activity, Nippo, Tag, TagTime, User } from "../type/user";

//型定義をlocalStorageのkeyに変換する
export function getNippoKeyList(
  id: number
): Record<Exclude<keyof Nippo, "id">, string> {
  return {
    date: `nippo-${id}-date`,
    activities: `nippo-${id}-activityIds`,
  };
}

export function getActivityKeyList(
  id: number
): Record<Exclude<keyof Activity, "id">, string> {
  return {
    title: `activity-${id}-title`,
    tag: `activity-${id}-tagid`,
    startTime: `activity-${id}-startTime`,
    endTime: `activity-${id}-endTime`,
  };
}

export function getTagKeyList(
  id: number
): Record<Exclude<keyof Tag, "id">, string> {
  return {
    title: `tag-${id}-title`,
    timeCount: `tag-${id}-timeCountIds`,
    createDate: `tag-${id}-createDate`,
  };
}

export function getUserKeyList(): Record<keyof User, string> {
  return {
    nextActivityId: "nextActivityId",
    nextNippoId: "nextNippoId",
    nextTagId: "nextTagId",
    nextTagTimeId: "nextTagTimeId",
  };
}

export function getTagTimeKeyList(
  id: number
): Record<Exclude<keyof TagTime, "id">, string> {
  return {
    date: `tagtime-${id}-date`,
    timeCount: `tagtime-${id}-timeCount`,
  };
}
