import {Action} from "redux";
import {NewWish, Wish} from "../states";

export type WishAction =
    Action<"create_wish"> & { newWish: NewWish } |
    Action<"update_wish"> & { item: Wish } |
    Action<"delete_wish_by_trip_id"> & { tripId: number } |
    Action<"delete_wish_by_id"> & { id: number }

export const createWish = (newWish: NewWish): WishAction => ({type: "create_wish", newWish})
export const updateWish = (item: Wish): WishAction => ({type: "update_wish", item})
export const deleteWishByTripId = (tripId: number): WishAction => ({type: "delete_wish_by_trip_id", tripId})
export const deleteWishById = (id: number): WishAction => ({type: "delete_wish_by_id", id})
