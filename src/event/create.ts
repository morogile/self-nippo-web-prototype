import dayjs, { Dayjs } from "dayjs";
import { getTagSingle, getUser } from "../localStorage/getLocalStorage";
import {
  setActivity,
  setNextActivityId,
  setNextNippoId,
  setNextTagId,
  setNextTagTimeId,
  setNippo,
  setTag,
  setTagTime,
} from "../localStorage/setLocalStorage";
import { Activity, Nippo, Tag, TagTime } from "../type/user";

export async function createTag(title: string): Promise<Tag> {
  const user = getUser();

  const newTag = {
    id: user.nextTagId,
    title: title,
    timeCount: [] as TagTime[],
    createDate: dayjs(),
  };

  setTag(newTag);
  setNextTagId(user.nextTagId + 1);
  return newTag;
}

export async function createNippo(
  date: Dayjs | null,
  activities: Activity[]
): Promise<Nippo> {
  const user = getUser();

  const newNippo = {
    id: user.nextNippoId,
    date: date ?? dayjs(),
    activities: activities,
  };

  setNippo(newNippo);
  setNextNippoId(user.nextNippoId + 1);
  return newNippo;
}

export async function createActivity(
  activity: Activity,
  date: Dayjs | null
): Promise<Activity> {
  const user = getUser();

  //Activityの新規作成

  const newActivity = {
    id: user.nextActivityId,
    title: activity.title,
    tag: activity.tag,
    startTime: activity.startTime,
    endTime: activity.endTime,
  };

  setActivity(newActivity);
  setNextActivityId(user.nextActivityId + 1);

  //TagTimeの新規作成

  const newTagTime = {
    id: user.nextTagTimeId,
    date: date || dayjs(),
    timeCount: activity.endTime.diff(activity.startTime, "minute"),
  };
  setNextTagTimeId(user.nextTagTimeId + 1);

  setTagTime(newTagTime);

  //TagTimeを既存TagのtimeCountプロパティへの登録
  const tmpTag: Tag = getTagSingle(activity.tag.id);
  const newTag: Tag = {
    id: tmpTag.id,
    title: tmpTag.title,
    createDate: tmpTag.createDate,
    timeCount: tmpTag.timeCount.concat(newTagTime),
  };
  setTag(newTag);

  return newActivity;
}
