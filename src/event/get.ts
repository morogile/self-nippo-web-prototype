import dayjs from "dayjs";
import {
  getNippoSingle,
  getTagSingle,
  getUser,
} from "../localStorage/getLocalStorage";
import { getTagKeyList } from "../localStorage/keyList";
import { Nippo, Tag } from "../type/user";

/**
 * 全てのTagをgetする
 * @returns 全てのTag
 */
export function getAllTag(): Tag[] {
  const user = getUser();

  const tagArray = [] as Tag[];
  for (let i = 0; i < user.nextTagId; i++) {
    const tagSingle = getTagSingle(i);
    tagArray.push(tagSingle);
  }
  return tagArray;
}

/**
 * TagのtimeCount以外をgetする
 * @param id
 * @returns timeCountプロパティ以外のTag
 */
export function getTagPartial(id: number): Omit<Tag, "timeCount"> {
  const keys = getTagKeyList(id);
  const title = localStorage.getItem(keys.title);
  const createDate = localStorage.getItem(keys.createDate);
  return {
    id: id,
    title: title || "",
    createDate: dayjs(createDate || ""),
  };
}

/**
 * すべてのTagのtimeCount以外をgetする
 * @returns TagのtimeCountプロパティ以外[]
 */
export function getAllTagPartial(): Omit<Tag, "timeCount">[] {
  const tagCollection = [] as Omit<Tag, "timeCount">[];
  const nextTagId = getUser().nextTagId;

  for (let i = 0; i < nextTagId + 1; i++) {
    const keys = getTagKeyList(i);
    if (localStorage.getItem(keys.title)) {
      tagCollection.push(getTagPartial(i));
    }
  }
  return tagCollection;
}

export function getTagTimeTotal(tag: Tag, numberOfDay: number): number {
  let totalMinutes = 0;
  tag.timeCount.forEach((ct) => {
    if (dayjs().diff(ct.date, "day") <= numberOfDay) {
      totalMinutes += ct.timeCount;
    }
  });
  return totalMinutes;
}

export function getNippoCollection(numberOfDay: number): Nippo[] {
  const user = getUser();

  const nippoCollection = [] as Nippo[];
  console.log(user.nextNippoId);
  for (let i = user.nextNippoId - 1; i >= 0; i--) {
    const nippo = getNippoSingle(i);
    if (dayjs().diff(nippo.date, "day") <= numberOfDay) {
      nippoCollection.push(nippo);
    }
  }
  return nippoCollection;
}
