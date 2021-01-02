import {initialShoppingListState, ShoppingListState} from "../states";
import {ShoppingListAction} from "../actions/ShoppingListActions";

export const shoppingListReducer = (state: ShoppingListState = initialShoppingListState, action: ShoppingListAction): ShoppingListState => {
    switch (action.type) {
        case "create_shopping_list_item":
            return {...state, items: [...state.items, action.newItem]}
        case "delete_shopping_list_items_by_trip_id":
            return {...state, items: state.items.filter(it => it.tripId !== action.tripId)}
    }

    return state;
}
