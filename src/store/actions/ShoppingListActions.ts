import {Action} from "redux";
import {NewShoppingListItem} from "../states";

export type ShoppingListAction =
    Action<"create_shopping_list_item"> & { newItem: NewShoppingListItem } |
    Action<"delete_shopping_list_items_by_trip_id"> & { tripId: number }

export const createShoppingListItem = (newItem: NewShoppingListItem): ShoppingListAction => ({
    type: "create_shopping_list_item",
    newItem
})

export const deleteShoppingListItemsByTripId = (tripId: number): ShoppingListAction => ({
    type: "delete_shopping_list_items_by_trip_id",
    tripId
})
