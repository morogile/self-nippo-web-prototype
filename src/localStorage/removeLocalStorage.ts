import { getActivityKeyList, getNippoKeyList, getTagKeyList } from "./keyList";

export function removeActivitySingle(id: number): void {
  const keys = getActivityKeyList(id);
  localStorage.removeItem(keys.title);
  localStorage.removeItem(keys.tag);
  localStorage.removeItem(keys.startTime);
  localStorage.removeItem(keys.endTime);
}

export function removeTagSingle(id: number): void {
  const keys = getTagKeyList(id);
  localStorage.removeItem(keys.title);
  localStorage.removeItem(keys.timeCount);
  localStorage.removeItem(keys.createDate);
}

export function removeNippoSingle(id: number): void {
  const keys = getNippoKeyList(id);
  localStorage.removeItem(keys.date);
  localStorage.removeItem(keys.activities);
}
