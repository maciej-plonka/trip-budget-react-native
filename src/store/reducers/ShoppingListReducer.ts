import {initialShoppingListState, ShoppingListState} from "../states";
import {ShoppingListAction} from "../actions/ShoppingListActions";

export const shoppingListReducer = (state: ShoppingListState = initialShoppingListState, action: ShoppingListAction): ShoppingListState => {
    switch (action.type) {
        case "create_shopping_list_item":
            return {...state, items: [...state.items, action.newItem]}
        case "update_shopping_list_item":
            return {...state, items: state.items.map(it => it.id === action.item.id ? action.item : it)}
        case "delete_shopping_list_items_by_trip_id":
            return {...state, items: state.items.filter(it => it.tripId !== action.tripId)}
        case "delete_shopping_list_item_by_id":
            return {...state, items: state.items.filter(it => it.id !== action.id)}

    }

    return state;
}
