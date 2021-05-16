import {HasId, sameId} from "../BaseTypes";
import {nanoid} from "nanoid";

export function assignId<T>(value: T): T & HasId {
    const uniqueId = nanoid();
    return {...value, id: uniqueId}
}

export function updateItem<T extends HasId>(collection: ReadonlyArray<T>, newV: T): ReadonlyArray<T> {
    return collection.map(it => sameId(newV, it) ? newV : it)
}
