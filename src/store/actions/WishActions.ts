import {Action} from "redux";
import {NewWish, Wish} from "../models";
import {Id} from "../BaseTypes";
import {Money} from "../../models/Money";

export type WishAction =
    Action<"create_wish"> & { newWish: NewWish } |
    Action<"update_wish"> & { item: Wish } |
    Action<"delete_wish_by_id"> & { id: Id } |
    Action<"buy_wish"> & { wish: Wish, actualValue: Money }

export const createWish = (newWish: NewWish): WishAction => ({type: "create_wish", newWish})
export const updateWish = (item: Wish): WishAction => ({type: "update_wish", item})
export const deleteWishById = (id: Id): WishAction => ({type: "delete_wish_by_id", id})
export const buyWish = (wish: Wish, actualValue: Money): WishAction => ({type: "buy_wish", wish, actualValue})
