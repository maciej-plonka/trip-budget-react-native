import {Action} from "redux";
import {initialShoppingListState, ShoppingListItem, ShoppingListState} from "../states";
import {Money} from "../../models/Money";

export type ShoppingListAction =
    Action<"create_shopping_list_item">
    & { item: { id: number, tripId: number, targetValue: Money, name: string, budgetCategoryId?: number, description?: string } }

