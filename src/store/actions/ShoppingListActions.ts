import {Action} from "redux";
import {NewShoppingListItem, ShoppingListItem} from "../states";

export type ShoppingListAction =
    Action<"create_shopping_list_item"> & { newItem: NewShoppingListItem } |
    Action<"update_shopping_list_item"> & { item: ShoppingListItem } |
    Action<"delete_shopping_list_items_by_trip_id"> & { tripId: number } |
    Action<"delete_shopping_list_item_by_id"> & { id: number }

export const createShoppingListItem = (newItem: NewShoppingListItem): ShoppingListAction => ({
    type: "create_shopping_list_item",
    newItem
})

export const deleteShoppingListItemsByTripId = (tripId: number): ShoppingListAction => ({
    type: "delete_shopping_list_items_by_trip_id",
    tripId
})


export const deleteShoppingListItemById = (id: number): ShoppingListAction => ({
    type: "delete_shopping_list_item_by_id",
    id
})


export const updateShoppingListItem = (item: ShoppingListItem): ShoppingListAction => ({
    type: "update_shopping_list_item",
    item
})
